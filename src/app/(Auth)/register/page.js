'use client'
import RegisterLogic from '@/pagesHooks/registerHook';
import Link from 'next/link';
import React from 'react'

const Register = () => {

  const {name, email, password, confirmPassword, loading, error,
    onChangeName, onChangeEmail, onChangePassword, onChangeConfirmPassword, onSubmit} = RegisterLogic()
  return (
    <div className="min-h-screen max-sm:px-8 flex items-center justify-center bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🚀 Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              onChange={onChangeName}
              value={name}
              placeholder="Your Full Name"
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              onChange={onChangeEmail}  
              value={email}
              placeholder="you@example.com"
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              onChange={onChangePassword}
              value={password}
              placeholder="••••••••"
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              onChange={onChangeConfirmPassword}
              value={confirmPassword}
              placeholder="••••••••"
              disabled={loading}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className={`w-full cursor-pointer bg-blue-600 hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} text-white font-semibold py-2 px-4 rounded-lg transition duration-300`}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
    }

export default Register
