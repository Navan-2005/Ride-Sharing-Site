import React from 'react';
import { Link } from 'react-router-dom';

function Start() {
  return (
    <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1530652101053-8c0db4fbb5de?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen flex flex-col justify-between bg-gradient-to-b from-red-500 to-red-700 text-white">
      {/* Logo */}
      <div className="pt-8 px-8">
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      </div>

      {/* Content Box */}
      <div className="bg-white text-gray-900 py-8 px-6 rounded-t-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">Get Started</h2>
        <p className="text-center text-gray-600 mt-2">Start your journey with us today.</p>

        <Link
          to="/login"
          className="block bg-black text-white text-center py-3 rounded-lg mt-6 text-lg font-medium transition duration-300 hover:bg-gray-800"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

export default Start;
