import React, { useState, ChangeEvent } from "react";
import {
    CardCvcElement,
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface PaymentFormProps {
    priceId: string;
  }

  const PaymentForm: React.FC<PaymentFormProps> = ({ priceId }) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const stripe = useStripe();
    const elements = useElements();

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                fontSize: '17px', // Ajuste o tamanho conforme necessário
                padding: '5px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

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

            const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
            throw new Error("Card details elements not found");
        }

            const paymentMethodResponse = await stripe.createPaymentMethod({
                type: "card",
                card: cardNumberElement,
                billing_details: {
                    name: name,
                    email: email,
                },
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
                    userEmail: user.email,
                    paymentMethod: paymentMethodResponse.paymentMethod.id,
                    priceId,
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
        <div className="flex flex-col text-sm gap-2">
        <div className="flex flex-col gap-0.5">
        Nome:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-zinc-100 rounded p-1.5 text-base"
          placeholder="Maria"
        />
        </div>
        <div className="flex flex-col gap-0.5">
        Email:{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-100 rounded p-1.5 text-base"
          placeholder="exemplo@email.com"
        />
        </div>
        <label>
            Número do Cartão:
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} className="bg-zinc-100 p-1.5 rounded font-light" />
        </label>
        <label>
            CVC:
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} className="bg-zinc-100 p-1.5 rounded font-light"/>
        </label>
        <label>
            Validade:
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} className="bg-zinc-100 p-1.5 rounded font-light"/>
        </label>
        
        <button className="bg-rose-400 hover:brightness-95 transition text-white rounded py-2" onClick={createSubscription}>Assinar</button>
      </div>
    );
}

export default PaymentForm;