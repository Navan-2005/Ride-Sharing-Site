import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ChevronRight } from 'lucide-react';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/login`,
                { email, password }
            );

            if (response.status === 200) {
                const { user, token } = response.data;
                
                // Set user in context
                setUser(user);
                
                // Store in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                
                console.log('User data:', user);
                console.log('New User : ',user.fullname.firstname);
                // Navigate after context is updated
                navigate('/home');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed');
        }
    };

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
                        <h3 className="text-2xl font-bold text-gray-900">Welcome Back</h3>
                        <p className="text-gray-500">Please enter your details to sign in</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
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
                                </div>
                            </div>

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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold text-lg transition duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 flex items-center justify-center group">
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
                        to="/captainlogin"
                        className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center transition duration-300 hover:from-green-700 hover:to-green-600 focus:ring-4 focus:ring-green-200"
                    >
                        Sign in as Captain
                    </Link>

                    {/* Signup Link */}
                    <p className="text-center text-gray-600">
                        New here?{' '}
                        <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
