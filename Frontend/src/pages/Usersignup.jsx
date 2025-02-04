import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { User, Lock, ChevronRight } from 'lucide-react';
import {UserDataContext} from '../context/userContext';
import axios from 'axios';

function Usersignup() {

   const navigate=useNavigate();

  const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [firstname,setFirstname]=useState('')
    const [lastname,setLastname]=useState('')
    // const [userdata,setUserdata]=useState({})
  
   const {user,setUser}=React.useContext(UserDataContext)

   

    const submitHandler= async (e)=>{
      e.preventDefault();
      const newuser={
            fullname:{
              firstname:firstname,
              lastname:lastname
            },
            email:email,
            password:password
      }
    //   console.log(userdata);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newuser)
      if(response.status==201)
      {
        const data=response.data

        setUser(data.user)
        localStorage.setItem('token',data.token)

        navigate('/home')
      }

      setEmail('');
      setPassword('');
      setLastname('');
      setFirstname('');
}

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 px-6">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
                alt="Logo"
                // className="w-12 h-12 object-contain"
              />
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Welcome </h3>
            <p className="text-gray-500">Please enter your details to sign up</p>
          </div>

          {/* Login Form */}
          <form onSubmit={submitHandler} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <div className="relative flex gap-4">
                        <div className="relative w-1/2">
                    <input
                    type="text"
                    required
                    placeholder="Firstname"
                    value={firstname}
                    onChange={(e)=>setFirstname(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="relative w-1/2">
                    <input
                    type="text"
                    required
                    placeholder="Lastname"
                    value={lastname}
                    onChange={(e)=>setLastname(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    />
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>
            </div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
             
            <div className="relative">
            <input
                type="email"
                value={email}
                onChange={(e) => {
                setEmail(e.target.value);
                }}
                required
                placeholder="Enter your email"
                className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
            />
            <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div> {/* Closing tag for the email input div */}
    
           <div className="relative">
             <label className="block text-gray-700 font-medium mb-1">Password</label>
             <div className="relative">
               <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                      placeholder="Enter your password"
                      className="w-full p-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
                    />
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                 </div>
               </div>
             </div>

             <button
               type="submit"
               className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 flex items-center justify-center group"
             >
               Sign Up
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
            to="/captainsignup"
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center transition duration-300 hover:from-green-700 hover:to-green-600 focus:ring-4 focus:ring-green-200"
          >
            Sign Up as Captain
          </Link>

          {/* Signup Link */}
          <p className="text-center text-gray-600">
            Already an User?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
              Sign In to your Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Usersignup