"use client";
import { OctagonX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { handleRemoveFromCart } from "@/Redux/slices/cartSlice";
import { toast } from "sonner";

const Page = () => {
  const userCart = useSelector((state) => state?.cart?.cartItems);
  const user = useSelector((state) => state?.user?.user);


  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeleteProduct = async(productId) => {
      try {
        const res =await dispatch(handleRemoveFromCart({ userId: user.id, productId })).unwrap();
        console.log(res)
        router.refresh(); // Refresh the page to reflect the changes
        toast.success("Product removed from cart successfully!");
      }
      catch (error) {
        console.error("Error deleting product from cart:", error);
      }
  }

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  const subtotal = userCart?.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
              Your Cart
            </h1>
          </header>

          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            {userCart?.length === 0 ? (
              <p className="text-gray-500 text-center text-lg font-medium">
                Your cart is empty
              </p>
            ) : (
              <ul className="space-y-6">
                {userCart?.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-6 border-b border-gray-300 pb-6"
                  >
                    <Image
                      src={item.banner?.url || "/placeholder.jpg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {item.category}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-base font-bold text-gray-900">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                    <AlertDialog>
                  <AlertDialogTrigger className="text-gray-500 hover:cursor-pointer hover:text-red-500 transition-colors relative after:content-['delete_this_product_from_cart'] after:absolute after:-top-[calc(100%+15px)] after:font-semibold after:-left-20 after:text-sm after:bg-gray-500 after:rounded-2xl after:p-1 after:text-white after:whitespace-nowrap after:mt-1 after:hidden hover:after:block">
                     <OctagonX />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='mb-7'>
                        Are you absolutely sure to delete this product from cart?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteProduct(item.documentId)}
                        className="cursor-pointer bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-12 pt-8">
              <div className="w-full ml-auto space-y-4 flex flex-col items-center">
                <div className="flex gap-4 text-lg font-bold">
                  <dt>Total</dt>
                  <dd>${subtotal?.toFixed(0)}</dd>
                </div>

                <div className="flex justify-center ">
                  <Link
                    href="/checkout"
                    className="block w-full max-w-xs rounded-lg bg-blue-600 px-6 py-3 text-center text-white font-semibold hover:bg-blue-700 transition-colors shadow-md"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
