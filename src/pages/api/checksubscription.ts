"use server"

import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
  ) {
    const { stripeUser } = req.body;

  if (!stripeUser || !stripeUser[0] || !stripeUser[0].stripe_id) {
    return res.status(400).json({ error: 'Stripe user ID is missing.' });
  }

  const stripeId = stripeUser[0].stripe_id;

  try {
    const customer = await stripe.customers.retrieve(stripeId);

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
    });
  
  
      res.status(200).json({ subscriptions });
    } catch (err) {
        console.error(err);
        res.status(400).json({ err });
      }
  }