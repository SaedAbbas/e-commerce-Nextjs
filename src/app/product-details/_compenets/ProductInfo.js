import React, { use, useState } from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoVerified } from "react-icons/go";
import SkeltonProduct from '@/Compenets/SkeltonProduct';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddToCart } from '@/Redux/slices/cartSlice'; // تأكد من مكان استيراد الـ action

const ProductInfo = ({ productDetails }) => {
  const dispatch = useDispatch();
  
  const [isAdded, setIsAdded] = useState(false);  // حالة لمعرفة إذا تم إضافة المنتج
  const [loading, setLoading] = useState(false);   // حالة لعرض الـ loading أثناء إضافة المنتج

  const userId = useSelector((state) => state.user.user.id); // تأكد من أن الـ user موجود في الـ Redux store

  const handleeAddToCart = async () => {
    setLoading(true);
    try {
      await dispatch(handleAddToCart({
        userId, 
        productId: productDetails.id, // تأكد من أن الـ productDetails موجود
      })).unwrap();
      setIsAdded(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setLoading(false);
  };

  return productDetails?.id ? (
    <div className="col-span-1 w-full max-md:flex max-md:flex-col max-md:items-center max-md:my-4">
      <h1 className="text-2xl font-semibold my-4 text-gray-800">{productDetails.title}</h1>
      <h3 className="text-xl text-gray-600">{productDetails.category}</h3>
      <p className="text-gray-500 max-md:text-center max-md:px-4 mt-2">{productDetails.description}</p>

      <div className="flex items-center text-3xl mt-4">
        {productDetails.instantDelivery ? (
          <>
            <RiVerifiedBadgeFill className="text-green-500 mr-2 text-3xl" />
            <h3 className="text-sm font-bold my-4">Eligible for Instant Delivery</h3>
          </>
        ) : (
          <GoVerified className="text-gray-500" />
        )}
      </div>

      <div className="flex justify-between items-center max-md:flex-row-reverse max-md:gap-4 mt-4">
        <span className="text-xl font-semibold text-gray-800">{productDetails.price} $</span>
        
        {/* زر إضافة للعربة */}
        <button 
          onClick={handleeAddToCart} 
          className="px-4 py-2 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      {/* رسالة نجاح بعد إضافة المنتج */}
      {isAdded && !loading && (
        <p className="mt-4 text-green-500">✅ تم إضافة المنتج إلى العربة بنجاح!</p>
      )}
    </div>
  ) : <SkeltonProduct />;
};

export default ProductInfo;
