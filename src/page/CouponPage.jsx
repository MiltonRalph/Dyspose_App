import React, { useEffect, useState } from 'react';
import { FaTag } from 'react-icons/fa'; // Tag icon for coupon image
import Loader from '../components/Loader';

const CouponPage = () => {
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = "https://dyspose-app.onrender.com"

  const userId = JSON.parse(window.sessionStorage.getItem('userId'));
  const token = JSON.parse(window.sessionStorage.getItem('token'));

  const getUserData = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/users/user/${userId}`

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className='min-h-screen py-8 px-4'>
      {loading ? (
        <div className='flex justify-center items-center min-h-screen'>
          <Loader />
        </div>
      ) : (
        <div>
          {user?.userData?.coupons?.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
              {user.userData.coupons.reverse().map((coupon, index) => (
                <div
                  key={index}
                  className='relative bg-white shadow-md rounded-lg p-6 border-2 border-gray-200 hover:shadow-lg transition duration-300 ease-in-out'>
                  <div className='absolute -top-6 left-6 bg-blue-100 p-4 rounded-full border-2 border-blue-300 shadow-md'>
                    <FaTag size={30} className='text-blue-600' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-800 mt-8'>
                    {coupon.service}
                  </h3>
                  <div className='mt-4 bg-blue-50 text-blue-700 text-center font-mono text-lg py-2 rounded-md'>
                    {coupon.code || 'Invalid'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center text-gray-700 text-center min-h-screen'>
              <div className='mb-6'>
                <FaTag size={50} className='text-gray-500' />
              </div>
              <h2 className='text-2xl font-semibold'>No Coupons Available</h2>
              <p className='mt-2 text-gray-500'>
                Check back later for amazing deals!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponPage;
