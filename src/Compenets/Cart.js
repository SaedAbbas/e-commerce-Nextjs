import Image from 'next/image';
import Link from 'next/link';

const Cart = ({ userCart }) => {
  return (
    <div
      className="absolute w-screen max-w-xs bg-gray-100 border border-gray-200 rounded-lg shadow-md p-4 top-12 right-0 z-20"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        aria-label="Close cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="mt-4">
        {userCart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty</p>
        ) : (
          <ul className="space-y-3 h-80 overflow-auto ">
            {userCart.map((item) => (
                console.log('item :', item),
              <li key={item.id} className="flex items-center gap-3">
                <Image
                  src={item.banner?.url || '/placeholder.jpg'}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded object-cover border border-gray-100"
                />
                <div>
                  <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                  <span className="text-sm font-medium text-gray-800">${item.price}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <Link
          href="/cart"
          className="block rounded bg-blue-600 text-white text-sm font-medium py-2 text-center hover:bg-blue-700"
        >
          View Cart ({userCart.length})
        </Link>
        <Link
          href="/checkout"
          className="block rounded bg-gray-600 text-white text-sm font-medium py-2 text-center hover:bg-gray-700"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;