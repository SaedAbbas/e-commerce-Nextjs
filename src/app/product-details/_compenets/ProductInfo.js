import React, { useState } from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoVerified } from "react-icons/go";
import SkeltonProduct from '@/Compenets/SkeltonProduct';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, handleAddToCart } from '@/Redux/slices/cartSlice';
import { toast } from 'sonner';

const ProductInfo = ({ productDetails }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user?.user?.id);

  const handleAddToCart = async () => {
    if (!userId) {
      toast.error('You must be logged in to add items to your cart.');
      return;
    }

    setLoading(true);
    try {
      await dispatch(handleAddToCart({
        userId,
        productId: productDetails?.documentId,
      })).unwrap();

      dispatch(fetchCartItems(userId));
      toast.success('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!productDetails?.id) return <SkeltonProduct />;

  return (
    <div className="col-span-1 pt-0 w-full max-w-2xl mx-auto p-6 rounded-2xl bg-white transition-all duration-300">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
        {productDetails.title}
      </h1>

      <h3 className="text-lg text-blue-500 font-medium text-center md:text-left">
        {productDetails.category}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm md:text-base text-center md:text-left leading-relaxed">
        {productDetails.description}
      </p>

      <div className="flex items-center gap-2 mt-6 text-green-600 dark:text-green-400">
        {productDetails.instantDelivery ? (
          <>
            <RiVerifiedBadgeFill className="text-2xl" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Instant Delivery
            </span>
          </>
        ) : (
          <div className="flex items-center gap-2 text-gray-400">
            <GoVerified className="text-xl" />
            <span className="text-sm">Standard Delivery</span>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">
          ${productDetails.price}
        </span>

        <button
          onClick={handleAddToCart}
          className="w-full md:w-auto px-6 py-2.5 text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-xl shadow-sm disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
