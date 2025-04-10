// app/login/page.js
'use client';
import LoginHook from '@/pagesHooks/loginHook';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  const [email, password, loading, error, onChangeEmail, onChangePassword, onSubmit] = LoginHook();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          👋 Welcome Back!
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              onChange={onChangeEmail}
              value={email}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              onChange={onChangePassword}
              value={password}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className={`w-full bg-blue-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <h3 className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Sign up
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Login;