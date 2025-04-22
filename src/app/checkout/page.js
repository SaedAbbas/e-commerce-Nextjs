"use client";

import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const userCart = useSelector((state) => state?.cart?.cartItems);
  const total = userCart?.reduce((sum, item) => sum + item.price, 0) || 0;

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: userCart }),
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const { id } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        toast.error("خطأ في الانتقال إلى صفحة الدفع");
        console.error(error);
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء معالجة الدفع");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">إتمام الدفع</h1>

        {userCart?.length === 0 ? (
          <p className="text-gray-500 text-center text-lg font-medium">
            عربة التسوق فارغة
          </p>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">ملخص الطلب</h2>
            <div className="space-y-3 mb-6">
              {userCart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b border-gray-200 pb-3"
                >
                  <Image
                    src={item.banner?.url || "https://via.placeholder.com/50"}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-700">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-700">المجموع:</h2>
              <p className="text-xl font-bold text-blue-600">${total.toFixed(2)}</p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || userCart.length === 0}
              className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-all duration-300 ${
                loading || userCart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "جاري المعالجة..." : "ادفع الآن"}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              🔒 مدعوم بواسطة Stripe - دفع آمن
            </p>

            <Link
              href="/cart"
              className="block text-center text-blue-600 hover:underline text-sm mt-4"
            >
              العودة إلى العربة
            </Link>
          </>
        )}
      </div>
    </div>
  );
}