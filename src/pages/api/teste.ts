import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.authorization?.split(" ")[1];
  const { userId } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  );

  try {
    if (req.method !== "POST") {
      return res.status(400).json({ message: "Bad request" });
    }

    res.json({
      message: "Subscription successfully initiated",
    });

    try {
      const { data, error } = await supabase
        .from("subscription")
        .upsert({ id: userId, subscription_date: "teste2" })

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
