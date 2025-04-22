import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title || "Unknown Product",
            images: [item.banner?.url || "https://via.placeholder.com/150"],
          },
          unit_amount: Math.round(item.price * 100), // المبلغ بالسنتات
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,      
      cancel_url: `${request.headers.get("origin")}/cart`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    return NextResponse.json({ error: "Error creating checkout session: " + err.message }, { status: 500 });
  }
}