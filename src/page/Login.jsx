import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const backendUrl = "https://dyspose-app.onrender.com"
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate


  // Handle email input change
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    setIsEmailValid(emailPattern.test(emailValue));
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid && password) {
      setLoading(true);
      setError('');

      // Backend registration logic using the models provided
      try {
        const response = await fetch(
          `${backendUrl}/api/v1/users/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({ email, password }),
          }
        );

        
        // // Redirect user to profile page or dashboard
        const data = await response.json();
        if (response.ok) {
          window.sessionStorage.setItem(
            'userId',
            JSON.stringify(data.user.id)
          );
          window.sessionStorage.setItem(
            'token',
            JSON.stringify(data.token)
          );
          console.log(window.sessionStorage.getItem('userId'));
          // Notify success
          toast.success('Login successful!', {
            position: 'top-right',
            autoClose: 3000, // Close after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Login failed.');
        }
      } catch (error) {
        toast.error('Error connecting to server, Try again!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please make sure all fields are valid.');
    }
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='bg-white mx-3 p-6 rounded-lg shadow-lg w-96'>
          <h2 className='text-2xl font-semibold mb-4 text-primaryColor'>
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className='mb-4 relative'>
              <input
                name='email'
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Enter your email'
                required
                className='w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none'
              />
              <FaEnvelope
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                  isEmailValid ? 'text-green-500' : 'text-red-500'
                }`}
              />
            </div>

            {/* Password Input */}
            <div className='mb-4 relative'>
              <input
                name='password'
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder='Create password'
                required
                className='w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none'
              />
              {passwordVisible ? (
                <FaEyeSlash
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={() => setPasswordVisible(false)}
                />
              ) : (
                <FaEye
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer'
                  onClick={() => setPasswordVisible(true)}
                />
              )}
            </div>

            {password && (
              <div className='mb-4'>
                <ul>
                  <p className='text-xs text-red-500'>
                    {password.length >= 8
                      ? ''
                      : 'Password must contain 8 characters'}
                  </p>
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <button
              className={`w-full px-4 py-2 border rounded-md ${
                isEmailValid && password
                  ? 'bg-primaryColor text-white cursor-pointer'
                  : 'bg-secondaryColor text-white cursor-not-allowed'
              } transition duration-200`}
              disabled={!(isEmailValid && password) || loading}>
              {loading ? 'Login In...' : 'Login'}
            </button>
            <div className='flex justify-between mt-4'>
              <p className='text-sm text-secondaryColor'>New User?</p>
              <Link
                to='/'
                className='text-sm text-primaryColor hover:text-hoverColor'>
                Register Here
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <p className='text-red-500 mt-2 text-center text-sm'>{error}</p>
            )}
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
