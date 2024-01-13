import React, { useState, ChangeEvent } from "react";
import {
    CardElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function PaymentForm(): JSX.Element {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const stripe = useStripe();
    const elements = useElements();

    const createSubscription = async () => {
        try {
            if (!stripe || !elements) {
                throw new Error("Stripe not initialized");
            }

            const supabase = createClientComponentClient()
            const { data: { user } } = await supabase.auth.getUser()
            const session = await supabase.auth.getSession();
            const token = session.data.session?.access_token;
            if (!user?.id) {
                throw new Error("User not found");
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error("Card element not found");
            }

            const paymentMethodResponse = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (paymentMethodResponse.error) {
                throw paymentMethodResponse.error;
            }

            const response = await fetch("/api/subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    email,
                    userId: user.id,
                    paymentMethod: paymentMethodResponse.paymentMethod.id,
                }),
            });

            if (!response.ok) throw new Error("Payment unsuccessful!");

            const data = await response.json();
            const confirm = await stripe.confirmCardPayment(data.clientSecret);
            if (confirm.error) throw confirm.error;

            alert("Payment Successful! Subscription active.");
        } catch (err: any) {
            console.error(err);
            alert("Payment failed! " + err.message);
        }
    };

    return (
        <div style={{ width: "40%" }}>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        Email:{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <CardElement />
        <br />
        <button onClick={createSubscription}>Assinar</button>
        <br></br>
      </div>
    );
}

export default PaymentForm;