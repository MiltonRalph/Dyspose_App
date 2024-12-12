import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';

const BuyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State for total price

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:4000/api/v1/products'
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setTotalPrice((prevTotal) => prevTotal + product.price); // Update total price
  };

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-red-500 text-center p-4 bg-red-100 rounded-lg'>
          <span className='font-semibold'>Error:</span> {error}
        </div>
      </div>
    );

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-bold text-center mb-8 text-green-700'>
        Shop Wastes
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <div
            key={product._id}
            className='bg-white shadow-lg rounded-lg p-4 transform hover:scale-105 hover:shadow-2xl transition duration-300'>
            <img
              src={product.image}
              alt={product.title}
              className='w-full h-48 object-cover rounded-lg mb-4'
            />
            <h2 className='text-xl font-semibold text-gray-800 truncate'>
              {product.title}
            </h2>
            <p className='text-gray-600 mt-2 text-sm'>{product.description}</p>
            <div className='flex justify-between items-center mt-4'>
              <span className='text-xl font-semibold text-green-700'>
                &#8358;{product.price}
              </span>
              <button
                className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200'
                onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className='mt-8 bg-gray-50 shadow-md rounded-lg p-6'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Your Cart</h2>
        {cart.length === 0 ? (
          <p className='text-gray-500'>
            Your cart is empty. Add products to your cart.
          </p>
        ) : (
          <>
            <ul className='divide-y divide-gray-200'>
              {cart.map((item, index) => (
                <li
                  key={index}
                  className='py-2 flex justify-between items-center text-gray-700'>
                  <span>{item.title}</span>
                  <span className='font-semibold text-green-600'>
                    &#8358;{item.price}
                  </span>
                </li>
              ))}
            </ul>
            <div className='mt-4 flex justify-between items-center text-xl font-semibold text-gray-800'>
              <span>Total Price:</span>
              <span className='text-green-700'>&#8358;{totalPrice.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyProducts;
