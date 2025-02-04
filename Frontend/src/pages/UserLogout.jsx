import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No token found, redirecting to login');
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.status === 200) {
          // Remove token from localStorage
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Logout error:', error);
        
        // Handle different error scenarios
        if (error.response?.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          console.log('Session expired or invalid, redirecting to login');
        }
        
        // Redirect to login regardless of error
        navigate('/login');
      }
    };

    handleLogout();
  }, []); // Empty dependency array means this runs once when component mounts

  // Show loading state while logout is processing
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Logging out...</h2>
        <p className="text-gray-500">Please wait while we sign you out.</p>
      </div>
    </div>
  );
}

export default UserLogout;