import React, { useEffect, useRef, useState } from 'react';

const ScanWastePage = () => {
  const videoRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  useEffect(() => {
    // Fetch saved images from sessionStorage
    const savedImages =
      JSON.parse(sessionStorage.getItem('scannedWastes')) || [];
    setCapturedImages(savedImages);

    // Get camera stream
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Camera access error:', error);
        alert('Unable to access camera. Please check permissions.');
      });
  }, []);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');

      const updatedImages = [
        ...capturedImages,
        { id: Date.now(), image: imageData },
      ];
      setCapturedImages(updatedImages);

      // Save to sessionStorage
      sessionStorage.setItem('scannedWastes', JSON.stringify(updatedImages));
    } else {
      console.error('Video stream is not available.');
    }
  };

  const handleDelete = (id) => {
    const updatedImages = capturedImages.filter((img) => img.id !== id);
    setCapturedImages(updatedImages);
    sessionStorage.setItem('scannedWastes', JSON.stringify(updatedImages));
  };

  const handleReport = (id) => {
    alert(`Reported waste with ID: ${id}`);
    // You can add further reporting logic here
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      {/* Camera Feed */}
      <div className='flex justify-center w-full'>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className='w-2/3 lg:w-1/3 mx-auto border rounded shadow-lg'></video>
      </div>

      {/* Capture Button */}
      <button
        onClick={handleCapture}
        className='mt-4 p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 focus:outline-none'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='white'
          className='w-8 h-8'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 13.5A3 3 0 1112 9a3 3 0 013 3 3 3 0 010 1.5zM19.5 8.25h-2.25m-7.5 0h-2.25m12.75 3.75v6a6 6 0 11-12 0v-6m13.5 0a6.75 6.75 0 10-13.5 0v6a8.25 8.25 0 1016.5 0v-6'
          />
        </svg>
      </button>

      {/* Scanned Waste Images */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full px-4'>
        {capturedImages.map(({ id, image }) => (
          <div
            key={id}
            className='flex flex-col items-center border rounded-lg shadow-lg p-4 bg-white'>
            <img
              src={image}
              alt='Scanned Waste'
              className='w-full max-h-48 object-cover rounded'
            />
            <div className='mt-4 flex space-x-4'>
              <button
                onClick={() => handleReport(id)}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                Report
              </button>
              <button
                onClick={() => handleDelete(id)}
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanWastePage;
