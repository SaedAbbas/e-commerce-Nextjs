"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { handleRemoveFromCart, fetchCartItems } from "@/Redux/slices/cartSlice";
import { toast } from "sonner";
import { handleOrder } from "@/Redux/slices/orderSlice";

export default function Success() {
  const user = useSelector((state) => state?.user?.user);
  const userCart = useSelector((state) => state?.cart?.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const subtotal = userCart?.reduce((sum, item) => sum + item.price, 0) || 0;

  // التحقق من وجود session_id (يعني المستخدم جاي من Stripe)
  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
    }
  }, [sessionId, router]);

  useEffect(() => {
    const clearCartAndSendEmail = async () => {
      try {
        // 1. حفظ الطلب
        await dispatch(handleOrder({
          email: user?.email,
          username: user?.username,
          amount: subtotal,
          productss: userCart,
        })).unwrap();

        // 2. تفريغ العربة
        for (const item of userCart) {
          await dispatch(handleRemoveFromCart({ userId: user?.id, productId: item.documentId })).unwrap();
        }
        dispatch(fetchCartItems(user?.id));

        // 3. توليد كود عشوائي
        const validationCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // مثال: 3KF92Q

        // 4. إرسال الإيميل
        const res = await fetch("/api/send-confirmation-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user?.email,
            validationCode,
          }),
        });

        if (!res.ok) {
          throw new Error("فشل في إرسال إيميل التأكيد");
        }

        toast.success("📧 تم إرسال إيميل تأكيد الطلب!");

      } catch (error) {
        console.error("Error after payment success:", error);
        toast.error("حدث خطأ أثناء معالجة الطلب أو إرسال الإيميل");
      }
    };

    if (userCart?.length > 0 && user && sessionId) {
      clearCartAndSendEmail();
    }
  }, [userCart, user, dispatch, sessionId, subtotal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">تم الدفع بنجاح!</h1>
        <p className="text-gray-600 mb-6">
          شكرًا لثقتك بنا! تمت معالجة دفعتك وسيصلك بريد تأكيد قريبًا.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
