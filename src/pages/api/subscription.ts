"use server"

import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {

  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recebido:", token);
  console.log("Headers:", req.headers);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  );

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const { userId } = req.body;

  try {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Bad request" });
    }

    const { name, email, userId , paymentMethod } = req.body;

    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethod,
      invoice_settings: { default_payment_method: paymentMethod },
    });

    const product = await stripe.products.create({
      name: "Monthly subscription",
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "BRL",
            product: product.id,
            unit_amount: 200,
            recurring: {
              interval: "month",
            },
          },
        },
      ],
      payment_settings: {
        payment_method_types: ["card"],
      },
      expand: ["latest_invoice.payment_intent"],
    });

    const latestInvoice = subscription.latest_invoice;
    const paymentIntent = latestInvoice && typeof latestInvoice === 'object' ? latestInvoice.payment_intent : null;

    if (!paymentIntent || typeof paymentIntent === 'string') {
      return res.status(400).json({ message: "Invalid payment intent" });
    }

    res.json({
      message: "Subscription successfully initiated",
      clientSecret: paymentIntent.client_secret,
    });

    try {
      const { data, error } = await supabase
        .from("subscription")
        .upsert({ id: userId, stripe_id: customer.id, session: token })

      if (error) {
        throw error;
      }

      if (error) {
        console.log(
          "Nenhum dado encontrado - verifique se a tabela está correta"
        );
      } else {
        console.log("Conexão com o Supabase bem-sucedida:", data);
      }
    } catch (error) {
      console.error("Erro ao conectar com o Supabase:", error);
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
