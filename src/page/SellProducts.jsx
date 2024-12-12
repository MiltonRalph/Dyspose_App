import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellProducts = () => {
  const backendUrl = "https://dyspose-app.onrender.com"
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      setMessage('You must agree to the terms and conditions.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    try {
      setLoading(true);
      const token = JSON.parse(window.sessionStorage.getItem('token')); // Assuming token is stored in session storage
      await axios.post(`${backendUrl}/api/v1/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      // Notify success
      toast.success('Product has been added successfully!', {
        position: 'top-right',
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (error) {
      setMessage('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-6'>
      <form
        onSubmit={handleSubmit}
        className='max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg'>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Title</label>
          <input
            type='text'
            className='w-full p-2 border rounded'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>
            Description
          </label>
          <textarea
            className='w-full p-2 border rounded'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required></textarea>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Price</label>
          <input
            type='text'
            className='w-full p-2 border rounded'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 font-medium mb-2'>Image</label>
          <input
            type='file'
            className='w-full p-2 border rounded'
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='flex items-center'>
            <input
              type='checkbox'
              className='mr-2'
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            I agree to the{' '}
            <span className='text-blue-600 ml-1'>Terms and Conditions</span>
          </label>
          {agreeToTerms && (
            <p className='text-sm mt-2'>
              By listing a product, you confirm that it is your own, that it is
              not prohibited, and that all descriptions are accurate. You are
              also responsible for any legal obligations that arise from this
              listing.
            </p>
          )}
        </div>
        {message && <p className='text-red-500 mb-4'>{message}</p>}
        <button
          type='submit'
          className={`w-full p-3 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SellProducts;
