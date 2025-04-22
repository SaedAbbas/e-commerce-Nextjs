'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { handleRemoveFromCart, fetchCartItems } from "@/Redux/slices/cartSlice";
import { toast } from "sonner";
import { handleOrder } from "@/Redux/slices/orderSlice";

export default function SuccessHook () {

    
const user = useSelector((state) => state?.user?.user);
const userCart = useSelector((state) => state?.cart?.cartItems);
const dispatch = useDispatch();
const router = useRouter();
const searchParams = useSearchParams();
const sessionId = searchParams.get("session_id");

const subtotal = userCart.reduce((sum, item) => sum + item.price, 0) || 0;


useEffect(() => {
  if (!sessionId) {
    router.replace("/");
  }
}, [sessionId, router]);

// تفريغ العربة
useEffect(() => {
  const clearCart = async () => {
    try {

      await dispatch(handleOrder({email:user.email, username:user.username, amount:subtotal, products:userCart})).unwrap()  

      for (const item of userCart) {
        await dispatch(handleRemoveFromCart({ userId: user.id, productId: item.documentId })).unwrap();
      }
      dispatch(fetchCartItems(user.id));
      toast.success("تم تفريغ العربة بنجاح!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("فشل في تفريغ العربة");
    }
  };

  if (userCart?.length > 0 && user && sessionId) {
    clearCart();
  }
}, [userCart, user, dispatch, sessionId]);

}