import banner from './images/banner.jpg';

export default function Banner() {
  return (
    <div className="relative bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 ,100" />
          </svg>

          <main className="mx-10 md:mx-28">
            {/* <div className="sm:text-center lg:text-left"> */}
            <h1 className="pt-16 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Welcome to the</span>
              <span className="block text-indigo-600 xl:inline">
&nbsp;
                Pet-Planet
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              This is a platform where you get the most for you beloved pets. We
              come with Clinical Care and Products for your pets.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-5 sm:mt-8 justify-center lg:justify-start">
              <div className="rounded-md shadow-md">
                <a
                  href="/services"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Services
                </a>
              </div>
              <div className="sm:ml-3 rounded-md shadow-md">
                <a
                  href="/products"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  View Store
                </a>
              </div>
            </div>
            {/* </div> */}
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full z-0"
          src={banner}
          alt="banner"
        />
      </div>
      <hr />
    </div>
  );
}
