import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { createServerClient } from '@supabase/ssr';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
});

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
export default async function handler(req, res) {
  const supabase = createServerClient(
    // process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // get(name: string) {
          get(name) {
          return req.cookies[name];
        },
      },
    }
  );

//   const { data, error } = await supabase
//   .from("profiles")
//   .select("id")
//   .single();

// if (error || !data) {
//   console.error("Erro ao buscar o id do usuário", error);
//   return res.status(400).json({ message: 'Usuário não encontrado' });
// }

// const userId = data.id;

      try {
        if (req.method != "POST") return res.status(400);
        const { name, email, paymentMethod } = req.body;
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
        // Send back the client secret for payment
        res.json({
          message: "Subscription successfully initiated",
          clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      }
}
