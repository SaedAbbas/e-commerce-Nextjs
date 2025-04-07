import Link from 'next/link';
import React from 'react'

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 gray-200 to-gray-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              👋 Welcome Back!
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Login
              </button>
            </form>
    
            
            <h3 className="text-center text-sm text-gray-500 mt-4">
              Don't have an account? <Link href='/register' className="text-blue-600 font-medium hover:underline">Sign up</Link>
            </h3>
          </div>
        </div>
      );
}

export default Login
