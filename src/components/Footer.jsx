import React from 'react';
import { footerList } from '../Data';

function Footer() {
  return (
    <footer className="text-black py-12 px-4 sm:px-8 lg:px-16 border-t-2 border-[#7d7d7d]">
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        {/* Logo section */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold">Logo</h1>
        </div>

        {/* Email input and button section */}
        <div className="text-center md:text-left">
          <p className="text-lg mb-4">New Car to Wash? Join Us Now</p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your Email"
              className="p-3 text-lg rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors duration-300 whitespace-nowrap">
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer links section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {footerList.map((item, index) => (
          <div key={index} className="space-y-4">
            <h4 className="text-xl font-semibold">{item.title}</h4>
            <ul className="space-y-2">
              {item.list.map((li, i) => (
                <li key={i} className="text-lg hover:text-gray-600 transition-colors duration-300">
                  {li}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

export default Footer;