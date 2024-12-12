import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiCloud, BiRecycle, BiEdit } from 'react-icons/bi';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = JSON.parse(window.sessionStorage.getItem('userId'));
  const token = JSON.parse(window.sessionStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      setError('No token found. Please log in first.');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/v1/users/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, userId]);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await axios.put(
        `http://127.0.0.1:4000/api/v1/users/user/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Profile picture updated successfully!');
      setUserData(response.data);
    } catch (error) {
      alert('Error updating profile picture');
    }
  };

  if (loading) return <Loader />;
  if (error)
    return <div className='text-red-500 text-center mt-4'>{error}</div>;

  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100 p-6'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
        <div className='relative flex items-center justify-center'>
          <img
            src={userData.profilePicture || 'https://via.placeholder.com/150'}
            alt='Profile'
            className='w-32 h-32 rounded-full object-cover border-2 border-gray-300'
          />
          <label
            htmlFor='profilePic'
            className='absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition'>
            <BiEdit size={24} />
          </label>
          <input
            type='file'
            id='profilePic'
            className='hidden'
            onChange={handleProfilePictureChange}
          />
        </div>

        <h2 className='text-2xl font-semibold text-center capitalize text-gray-800'>
          {userData.username || 'Username'}
        </h2>
        <p className='text-center text-gray-600 mt-2'>
          {userData.city || 'City'}, {userData.state || 'State'}
        </p>

        <div className='grid grid-cols-2 gap-4 mt-6'>
          <div className='flex flex-col items-center'>
            <div className='text-blue-600 p-3 bg-gray-100 rounded-full'>
              <BiCloud size={32} />
            </div>
            <p className='text-gray-800 font-semibold mt-2'>0G</p>
            <p className='text-sm text-gray-500'>Saved CO2</p>
          </div>

          <div className='flex flex-col items-center'>
            <div className='text-green-600 p-3 bg-gray-100 rounded-full'>
              <BiRecycle size={32} />
            </div>
            <p className='text-gray-800 font-semibold mt-2'>
              {userData.wasteDumped?.length || '0'}
            </p>
            <p className='text-sm text-gray-500'>Recycled</p>
          </div>
        </div>

        <div className='mt-6'>
          <h3 className='text-lg font-semibold text-gray-800'>Quick Actions</h3>
          <div className='flex flex-col gap-3 mt-3'>
            <button className='px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition'>
              View Recycling History
            </button>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition'>
              Earn More Points
            </button>
            <button className='px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition'>
              Learn About CO2 Savings
            </button>
          </div>
        </div>
      </div>

      <button
        className='mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition'
        onClick={() => {
          window.sessionStorage.clear();
          window.location.reload();
        }}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
