import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BiBell, BiRecycle, BiCloud, BiMap } from 'react-icons/bi';
import { BsBarChart } from 'react-icons/bs';
import { ScaleLoader } from 'react-spinners';
import emailjs from '@emailjs/browser';
import axios from 'axios';
// import { MailPlus } from 'react-icons/bs';
import Loader from '../components/Loader'; // Assume a reusable loading spinner component
import waste1 from '../assets/img1.jpg';
import waste2 from '../assets/image2.jpg';
import waste3 from '../assets/image3.jpg';
import waste4 from '../assets/image4.jpg';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const form = useRef(null);

  const backendUrl = "https://dyspose-app.onrender.com"

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
          `${backendUrl}/api/v1/users/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, userId]);

  const sendEmail = async (e) => {
    e.preventDefault();

    const SERVICE_ID = 'service_ikxpy4e';
    const TEMPLATE_ID = 'template_62li04p';
    const PUBLIC_KEY = 'jyx-wXb5H6vKpoICV';

    try {
      setFormLoading(true);
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      // Notify success
      toast.success('Message sent successfully!', {
        position: 'top-right',
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setMessage('');
      form.current.reset();
    } catch (error) {
      setFormLoading(false);
      alert('An error occurred, Please try again');
      console.error('An error occurred:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const wastes = [
    {
      img: waste1,
      title: 'Plastic Bags',
      description:
        'Plastic cans, such as those used for beverages, cleaning products, or food containers, can take hundreds of years to decompose if left in landfills. However, many plastic cans are recyclable and can be repurposed into new products. Proper disposal and recycling of these plastics help reduce pollution, conserve raw materials, and minimize environmental damage.',
    },
    {
      img: waste2,
      title: 'Paper Bags',
      description:
        'Paper bags, once used for carrying groceries or other items, are often discarded after a single use. Though biodegradable, they still contribute to landfill waste when not recycled. By recycling paper bags, we can reduce the need for new paper production, conserving trees and energy. They can also be reused in various ways, including for crafting, as composting material, or even for recycling into new paper products.',
    },
    {
      img: waste3,
      title: 'Used Footwears',
      description:
        'Used footwear includes shoes, sandals, and boots that are no longer wearable or have outlived their usefulness. These items often end up in landfills, contributing to waste and environmental degradation. Recycling or repurposing old shoes can prevent them from taking up space in landfills and allow materials like rubber, leather, and fabric to be reused in new products.',
    },
    {
      img: waste4,
      title: 'Used Electronics',
      description:
        'Used electronics, often referred to as e-waste, includes discarded devices such as smartphones, laptops, televisions, and other electronic gadgets. These items often contain valuable metals like gold, silver, and copper, but they can also release harmful chemicals when not properly disposed of. Recycling e-waste helps recover these precious resources while reducing environmental harm from landfills and improper disposal.',
    },
  ];

  if (loading) return <Loader />;
  if (error)
    return <div className='text-red-500 text-center mt-4'>{error}</div>;

  return (
    <section className='flex flex-col gap-6 p-4 mb-12 bg-gray-50 min-h-screen md:p-8 lg:mb-0'>
      <div className='flex items-center justify-between bg-white shadow-md p-4 rounded-lg'>
        <div className='flex items-center gap-4'>
          <img
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt='User Profile'
            className='w-16 h-16 rounded-full border-2 border-gray-300 object-cover'
          />
          <div>
            <h1 className='text-xl font-semibold text-gray-800'>
              Hi, {user.username || 'User'}
            </h1>
            <p className='text-gray-600'>
              {user.state || 'Unknown'}, {user.city || 'Unknown'}
            </p>
          </div>
        </div>
        <div className='relative'>
          <BiBell
            size={28}
            className='text-gray-700 cursor-pointer hover:text-green-600'
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          />
          {notificationsOpen && (
            <div className='absolute top-10 right-0 w-64 bg-white shadow-lg rounded-lg p-4 border border-gray-200'>
              <h2 className='text-gray-800 font-semibold mb-2'>
                Notifications
              </h2>
              <p className='text-sm text-gray-600'>No new notifications</p>
            </div>
          )}
        </div>
      </div>

      <div className='bg-green-600 text-white p-6 rounded-lg shadow-md'>
        <div className='grid grid-cols-3 gap-3 md:gap-6'>
          <div className='flex flex-col items-center'>
            <div className='p-2 bg-white text-green-600 rounded-full md:p-3'>
              <BiMap size={32} />
            </div>
            <p className='mt-2 text-lg font-bold'>
              {user.totalPointsEarned || 0}
            </p>
            <p className='text-xs md:text-sm'>Points Earned</p>
          </div>

          <div className='flex flex-col items-center'>
            <div className='p-2 bg-white text-green-600 rounded-full md:p-3'>
              <BiCloud size={32} />
            </div>
            <p className='mt-2 text-lg font-bold'>0 CO2</p>
            <p className='text-xs md:text-sm'>CO2 Saved</p>
          </div>

          <div className='flex flex-col items-center'>
            <div className='p-2 bg-white text-green-600 rounded-full md:p-3'>
              <BiRecycle size={32} />
            </div>
            <p className='mt-2 text-lg font-bold'>
              {user?.wasteDumped?.length || 0}
            </p>
            <p className='text-xs md:text-sm'>Recycled</p>
          </div>
        </div>
      </div>

      <div className='bg-white shadow-md rounded-lg p-6 mt-6'>
        <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
          <BsBarChart size={24} className='text-blue-600' />
          Top Recycled Waste
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
          {wastes.map((waste, index) => (
            <div
              key={index}
              className='bg-gray-100 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform'>
              <img
                src={waste.img}
                alt={waste[index]}
                className='h-56 w-full object-cover'
              />
              <div className='p-4'>
                <h3 className='font-bold text-md text-gray-700 md:text-lg'>
                  {waste.title}
                </h3>
                <p className='text-sm text-gray-600'>{waste.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        autoComplete='off'
        ref={form}
        onSubmit={sendEmail}
        className='flex flex-col gap-3'>
        <div className='flex flex-col'>
          <h1 className=' font-semibold  opacity-90 text-primaryColor text-2xl tracking-wide'>
            Report an Incident
          </h1>
          <div className='flex flex-col'>
            <input
              type='text'
              placeholder='Enter your email'
              name='from_email'
              className=' border-2 border-black/40 p-3 mt-5 rounded-lg bg-transparent'
            />
            <select
              name='subject'
              className=' border-2 border-black/40 p-3 mt-5 rounded-lg bg-transparent'>
              <option value='Select Type of Incident'>
                Select Type of Incident
              </option>
              <option value='Overflowing Bins'>Overflowing Bins</option>
              <option value='Illegal Dumping'>Illegal Dumping</option>
              <option value='Littering'>Littering</option>
              <option value='Abandoned Waste'>Abandoned Waste</option>
              <option value='Unsanitary'>Unsanitary</option>
              <option value='Waste Spills'>Waste Spills</option>
            </select>
            <textarea
              placeholder='Enter Your Message'
              className=' bg-transparent h-64  mb-5 border-black/40 mt-2 p-4 rounded-lg w-full flex-auto  border-2'
              required
              autoComplete='false'
              name='message'
              value={message}
              onChange={handleMessageChange}></textarea>
            {formLoading ? (
              <button
                className='flex justify-center items-center bg-primaryColor text-white gap-3 p-4 md:w-1/2 md:self-center'
                disabled>
                <ScaleLoader color='#fff' className='scale-50' /> Processing...
              </button>
            ) : (
              <button className='flex justify-center items-center gap-3 bg-primaryColor text-white rounded-lg p-4 hover:bg-hoverColor md:w-1/2 md:self-center'>
                Report
              </button>
            )}
          </div>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default DashboardPage;
