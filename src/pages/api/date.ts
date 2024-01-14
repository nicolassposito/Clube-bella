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
    const serverTime = new Date();
    res.status(200).json({ time: serverTime });
}
