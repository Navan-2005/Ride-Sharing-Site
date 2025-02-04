import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CaptainDataContext } from '../context/Captaincontext';
// import User from 'lucide-react/User';
import { ChevronRight, Lock,User } from 'lucide-react';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)
      if (response.status === 200) {      
          const { captain, token } = response.data;
          
          // Format captain data as array-friendly structure
          const formattedCaptain = {
              id: captain._id,
              name: captain.fullname,
              email: captain.email,
              vehicle: captain.vehicle,
              status: captain.status,
              details: [
                  { label: 'Name', value: captain.fullname },
                  { label: 'Email', value: captain.email },
                  { label: 'Vehicle', value: captain.vehicle?.model || 'Not assigned' },
                  { label: 'Status', value: captain.status }
              ]
          };
          
          console.log("Formatted captain data:", formattedCaptain);
          
          // Set the captain data
          setCaptain(formattedCaptain);
          
          // Store in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('captain', JSON.stringify(formattedCaptain));
          
          navigate('/captainhome');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 px-6">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-20 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <img
                src="https://www.businessgujaratnews.com/wp-content/uploads/2020/10/uberlogo.jpg"
                alt="Logo"
                // className="w-12 h-12 object-contain"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
            <p className="text-gray-500">Please enter your details to sign in</p>
          </div>

          {/* Login Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e)=>{ setEmail(e.target.value) }}
                    required
                    placeholder="Enter your email"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="relative">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e)=>{ setPassword(e.target.value) }}
                    required
                    placeholder="Enter your password"
                    className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
            </div>

            <button type='submit' className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 flex items-center justify-center group">
              Sign In
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Captain Login */}
          <Link
            to="/login"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center transition duration-300 hover:from-green-700 hover:to-green-600 focus:ring-4 focus:ring-green-200"
          >
            Sign in as User
          </Link>

          {/* Signup Link */}
          <p className="text-center text-gray-600">
            New here?{' '}
            <Link to="/captainsignup" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin