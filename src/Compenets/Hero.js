import React from 'react'

const Hero = () => {
  return (
    <section className="bg-white lg:h-[calc(100vh-4rem)]  lg:place-content-center">
        <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-prose text-center">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                    All Your Digital Products
                    <strong className="text-primary mt-8"> Is One Click Away </strong>
                </h1>

                <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                    Start Exploring State of the Art Assets Now
                </p>

                <div className="mt-4 flex justify-center gap-4 sm:mt-6">
                    <a
                    className="inline-block rounded  bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-secondery"
                    href="#"
                    >
                    Get Started
                    </a>

                    <a
                    className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                    href="#"
                    >
                    Learn More
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero
