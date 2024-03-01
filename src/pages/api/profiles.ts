"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { Profile as OriginalProfile } from "@/app/admin/components/columns";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

type ProfileWithSubscription = OriginalProfile & {
  isActiveSubscription?: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(" ")[1];
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  );
  const filterEmail = req.query.filterEmail || "";
  try {
    const customers = await stripe.customers.list();

    const activeSubscriptions = await Promise.all(
      customers.data.map(async (customer) => {
        const subscriptions = await stripe.subscriptions.list({
          customer: customer.id,
          status: "active",
        });

        const { data: dataId, error: errorId } = await supabase
          .from("subscription")
          .select("id")
          .eq("stripe_id", customer.id);
        
        let id, ultimoEnvio;
        if (dataId && dataId.length > 0) {
          id = dataId[0].id;

          const { data: dataEnvio, error: errorEnvio } = await supabase
            .from("envios")
            .select("data_postagem")
            .eq("id", id);
          
          if (dataEnvio && dataEnvio.length > 0) {
            ultimoEnvio = dataEnvio[0].data_postagem;
          }
        }

        return {
          id: id || '',
          ultimoEnvio: ultimoEnvio || '',
          customer,
          activeSubscriptions: subscriptions.data,
        };
      })
    );

    const customersWithActiveSubscriptions = activeSubscriptions.filter(
      (cs) => cs.activeSubscriptions.length > 0
    );

    const customerData = customersWithActiveSubscriptions.map((customer) => ({
      id: customer.id,
      name: customer.customer.name,
      email: customer.customer.email,
      ultimoEnvio: customer.ultimoEnvio,
      plano: customer.activeSubscriptions.length > 0 ? customer.activeSubscriptions[0].items.data[0].plan.id : null,
    }));
    
    res.status(200).json(customerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error || "Internal Server Error" });
  }
}