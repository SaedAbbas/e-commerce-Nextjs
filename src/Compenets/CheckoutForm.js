'use client';

import { useState } from 'react';
import getStripe from '../utils/get-stripejs';

// دالة مساعدة للطلبات POST
const fetchPostJSON = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
};

export default function CheckoutForm({ courseId, courseName, price }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // إنشاء جلسة Checkout
      const checkoutSession = await fetchPostJSON('/api/checkout_sessions', {
        amount: price,
        courseId,
        courseName,
      });

      if (checkoutSession.statusCode === 500) {
        console.error(checkoutSession.message);
        setLoading(false);
        return;
      }

      // إعادة التوجيه إلى صفحة الدفع في Stripe
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error('خطأ في عملية الدفع:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-form">
        <div>
          <h3>{courseName}</h3>
          <p className="price">{price} USD</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="checkout-button"
        >
          {loading ? 'جارِ التحميل...' : 'شراء الآن'}
        </button>
      </div>

      <style jsx>{`
        .checkout-form {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
          background-color: #f9f9f9;
        }
        .price {
          font-weight: bold;
          font-size: 18px;
          margin: 10px 0;
        }
        .checkout-button {
          background-color: #5469d4;
          color: white;
          border: 0;
          border-radius: 4px;
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }
        .checkout-button:hover {
          background-color: #4a5db8;
        }
        .checkout-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
};