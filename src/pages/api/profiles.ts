"use server"

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Profile as OriginalProfile } from '@/app/admin/page';

type ProfileWithSubscription = OriginalProfile & {
    isActiveSubscription?: boolean;
  };

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
  const filterEmail = req.query.filterEmail || '';

  try {
    let query = supabase.from('profiles').select('id, fullname, email, subscriptions');

    if (filterEmail) {
      query = query.ilike('email', `%${filterEmail}%`);
    }

    const { data: profiles, error } = await query;

    if (error) {
      throw error;
    }

    const processedProfiles = await Promise.all(profiles.map(async profile => {
        switch (profile.subscriptions) {
          case 'MegaHairMes': {
            const { data: subscriptionData, error: subscriptionError } = await supabase
              .from('subscription_mega_mes')
              .select('subscription_date')
              .eq('id', profile.id)
              .single();
  
            if (subscriptionError) {
              console.error('Erro ao buscar data de subscrição:', subscriptionError);
              return profile;
            } else{
                console.log(subscriptionData)
            }
  
            (profile as any).isActiveSubscription = subscriptionData && new Date(subscriptionData.subscription_date) > new Date();
            break;
          }
          case 'LaceWigMes': {
            // Adicione aqui a lógica para LaceWigMes
            // Exemplo:
            // const { data: laceWigData, error: laceWigError } = await ...
            // profile.isActiveLaceWig = laceWigData && new Date(laceWigData.someDate) > new Date();
            break;
          }
          // Adicione mais casos conforme necessário
          default: {
            console.log('Nenhum usuario com assinatura encontrado')
            return null;
            break;
          }
        }
  
        return profile;
      }));
      
      const validProcessedProfiles = processedProfiles.filter(profile => profile !== null);

      console.log(validProcessedProfiles);
      res.status(200).json(validProcessedProfiles);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}