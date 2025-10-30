import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-gray-200 via-gray-200 to-gray-300 relative lg:h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="mx-auto w-screen max-w-screen-xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
            All Your Digital Products
            <strong className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mt-2">
              Are Just One Click Away 🚀
            </strong>
          </h1>

          <p className="mt-4 text-lg text-gray-700 sm:text-xl">
            Start Exploring State-of-the-Art Assets Now
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:scale-105"
              href="#"
            >
              Get Started
            </a>

            <a
              className="inline-block bg-white rounded-lg border border-gray-300 px-6 py-3 text-lg font-semibold text-gray-700 shadow-md transition-all duration-300 hover:scale-105"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
