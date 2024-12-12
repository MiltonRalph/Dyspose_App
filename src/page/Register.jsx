import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { statesAndCities } from '../utils/statesAndCities';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailValue));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword && confirmPassword !== value) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && password !== value) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };
  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity(''); // Reset city when state changes
  };

  const handleCityChange = (e) => setCity(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmailValid && password === confirmPassword) {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          'http://127.0.0.1:4000/api/v1/users/register',
          {
            method: 'POST',
            crossDomain: true,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              username,
              email,
              password,
              state,
              city,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          toast.success('Registered successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
          });
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setError(data.message || 'Registration failed.');
        }
      } catch (error) {
        toast.error('Error connecting to server, Try again!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please make sure all fields are valid and passwords match.');
    }
  };

  return (
    <>
      <div className='flex justify-center items-center h-screen bg-gray-100'>
        {/* <TypingEffect /> */}
        <div className='bg-white mt-6 mx-3 p-6 rounded-lg shadow-lg w-96'>
          <h2 className='text-2xl font-semibold mb-4 text-primaryColor'>
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className='mb-4'>
              <input
                type='text'
                value={username}
                onChange={handleUsernameChange}
                placeholder='Enter your username'
                className='w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none'
              />
            </div>

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

            {/* Password */}
            <div className='mb-4 relative'>
              <div
                className={`flex items-center justify-between w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none ${
                  passwordMismatch ? 'border-red-500' : 'border-gray-300'
                }`}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='bg-transparent focus:outline-none'
                  value={password}
                  onChange={handlePasswordChange}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className='cursor-pointer text-gray-700'
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEye
                    className='cursor-pointer text-gray-700'
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>

            {/* Confirm Password */}
            <div className='mb-4 relative'>
              <div
                className={`flex items-center justify-between w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none ${
                  passwordMismatch ? 'border-red-500' : 'border-gray-300'
                }`}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm your password'
                  className='bg-transparent focus:outline-none'
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className='cursor-pointer text-gray-700'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <FaEye
                    className='cursor-pointer text-gray-700'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>
            </div>

            {/* Password Error Messages */}
            {passwordMismatch && (
              <p className='text-red-500 text-xs mb-2'>Passwords don't match</p>
            )}
            {password &&
              confirmPassword.length < 8 &&
              confirmPassword.length > 0 && (
                <p className='text-red-500 text-xs mb-4'>
                  Password should have at least 8 characters
                </p>
              )}

            {/* State Dropdown */}
            <div className='mb-4'>
              <select
                value={state}
                onChange={handleStateChange}
                className='w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none'>
                <option value=''>Select State</option>
                {Object.keys(statesAndCities).map((stateKey) => (
                  <option key={stateKey} value={stateKey}>
                    {stateKey}
                  </option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className='mb-4'>
              <select
                value={city}
                onChange={handleCityChange}
                disabled={!state}
                className='w-full px-4 py-2 border rounded-md focus:ring-1 focus:outline-none'>
                <option value=''>Select City</option>
                {state &&
                  statesAndCities[state].map((cityItem, index) => (
                    <option key={index} value={cityItem}>
                      {cityItem}
                    </option>
                  ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              className={`w-full px-4 py-2 border rounded-md ${
                username &&
                email &&
                password &&
                confirmPassword &&
                password === confirmPassword &&
                state &&
                city
                  ? 'bg-primaryColor text-white cursor-pointer'
                  : 'bg-secondaryColor text-white cursor-not-allowed'
              } transition duration-200`}
              disabled={
                !(
                  username &&
                  email &&
                  password &&
                  confirmPassword &&
                  password === confirmPassword &&
                  state &&
                  city
                ) || loading
              }>
              {loading ? 'Registering...' : 'Register'}
            </button>

            <div className='flex justify-between mt-4'>
              <p className='text-sm text-secondaryColor'>Already Registered?</p>
              <Link
                to='/login'
                className='text-sm text-primaryColor hover:text-hoverColor'>
                Login Here
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

export default Register;
