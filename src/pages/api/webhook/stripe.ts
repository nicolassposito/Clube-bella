"use server"

import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import getRawBody from 'raw-body';
import { createClient } from '@supabase/supabase-js'

const express = require('express');
const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true,
  });

  export const config = {
    api: {
      bodyParser: false,
    },
  };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature']!;
  let event;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    // console.log("Evento Stripe construído:", event);
  } catch (err) {
      console.error(`⚠️  Webhook signature verification failed.`, (err as Error).message);
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
        console.log("Evento de pagamento bem-sucedido recebido", event);
        const { data, error } = await supabase
        .from("subscription")
        .select('id, stripe_id, session, subscription_type')
        .eq('stripe_id', event.data.object.customer)

        if (error) throw error;
        if (data.length === 0) {
          console.log("Nenhum dado encontrado - verifique se a tabela está correta", error);
          return null;
        }

        const userId = data[0].id;
        const stripeId = data[0].stripe_id;
        const sessionToken = data[0].session;
        const subscriptionType = data[0].subscription_type;
        const supabaseAlt = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            global: {
              headers: { Authorization: `Bearer ${sessionToken}` }
            },
          }
        );

        const dataFutura = new Date();
        dataFutura.setDate(dataFutura.getDate() + 30);

        switch (subscriptionType) {
          case "price_1OYY06FkEPvpDr1CP27NtZi3":
            {
              try {
                
              console.log("Assinatura Mega Hair");
              const { data: dataAlt, error: errorAlt } = await supabaseAlt
                .from("subscription_mega_mes")
                .upsert({ id: userId, subscription_date: dataFutura.toISOString().split('T')[0], stripe_id: stripeId })
                .eq('id', userId);
        
              if (errorAlt) {
                console.log("SupabaseAlt erro", errorAlt)
              } else {
                console.log("SupabaseAlt sucesso", dataAlt)
              }

              const { data: saveSubs, error: errorSaveSubs } = await supabaseAlt
                .from("profiles")
                .upsert({ id: userId, subscriptions: 'MegaHairMes' })
                .eq('id', userId);
        
              if (errorSaveSubs) {
                console.log("Erro ao salvar plano do usuario", saveSubs)
              } else {
                console.log("Sucesso ao salvar plano do usuario", saveSubs)
              }
              } catch (error) {
                console.error("Erro ao conectar com o Supabase:", error);
              }
            }
            break;
            case "price_1OYXz1FkEPvpDr1Cd01yWGQT":
              {
                try {
                
                  console.log("Assinatura Lace");
                  const { data: dataAlt, error: errorAlt } = await supabaseAlt
                    .from("subscription_lace_mes")
                    .upsert({ id: userId, subscription_date: dataFutura.toISOString().split('T')[0], stripe_id: stripeId })
                    .eq('id', userId);
            
                  if (errorAlt) {
                    console.log("SupabaseAlt erro", errorAlt)
                  } else {
                    console.log("SupabaseAlt sucesso", dataAlt)
                  }
    
                  const { data: saveSubs, error: errorSaveSubs } = await supabaseAlt
                    .from("profiles")
                    .upsert({ id: userId, subscriptions: 'LaceWigMes' })
                    .eq('id', userId);
            
                  if (errorSaveSubs) {
                    console.log("Erro ao salvar plano do usuario", saveSubs)
                  } else {
                    console.log("Sucesso ao salvar plano do usuario", saveSubs)
                  }
                  } catch (error) {
                    console.error("Erro ao conectar com o Supabase:", error);
                  }
              }
              break;
          default:
             console.log("nenhuma assinatura retornada");
          }

      if (error) {
        console.log(
          "Nenhum dado encontrado - verifique se a tabela está correta"
        );
      } else {
        console.log("Conexão com o Supabase bem-sucedida:", data);
      }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
  console.log("Resposta enviada com sucesso.");
};