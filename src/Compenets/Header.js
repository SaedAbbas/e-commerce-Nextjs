import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className="border-b-2 border-amber-50 bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-300">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-6 sm:px-8 lg:px-10">
        {/* Logo */}
        <a className="block text-teal-600 hover:scale-110 transition-transform duration-300" href="#">
          <span className="sr-only">Home</span>
          <Image src='/logo.svg'  width={35} height={35} alt='logo' className='transition-all duration-300 hover:brightness-110' />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          {/* Navigation */}
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {["Home", "Explore", "Projects", "About us", "Contact us"].map((item, index) => (
                <li key={index}>
                  <a 
                    className="text-gray-600 font-medium transition-all duration-300 hover:text-blue-600 hover:underline underline-offset-6"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-95"
                href="#"
              >
                Login
              </a>

              <a
                className="hidden rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-300 hover:bg-gray-100 hover:text-gray-900 active:scale-95 sm:block"
                href="#"
              >
                Register
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="block rounded-md bg-gray-100 p-2.5 text-gray-600 transition-all duration-300 hover:bg-gray-200 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
