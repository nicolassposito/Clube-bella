import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { cookies, headers } from "next/headers"
import { createServerClient } from '@supabase/ssr';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const fetchFullName = async (): Promise<string | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao buscar o id do usuário", error);
      return null;
    }

    return data?.id || null;
  };

  if (req.method === 'POST') {
    try {
      const userId = await fetchFullName();
      if (!userId) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
      }

      const stripeCustomerId = await getOrCreateStripeCustomer(userId);

      const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{ price: 'price_1OVKSZFkEPvpDr1CnjTIAond' }],
        expand: ['latest_invoice.payment_intent'],
      });

      res.status(200).json(subscription);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar a assinatura' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  try {
    let customerList = await stripe.customers.list({ email: 'email_do_cliente@example.com' });

    if (customerList.data.length) {
      return customerList.data[0].id;
    } else {
      let newCustomer = await stripe.customers.create({
        email: 'email_do_cliente@example.com',
      });
      return newCustomer.id;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao criar/recuperar cliente no Stripe:', error.message);
    } else {
      console.error('Erro ao criar/recuperar cliente no Stripe:', error);
    }
    throw error;
  }
}
