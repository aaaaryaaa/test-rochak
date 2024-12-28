// components/Disclaimer.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure the CSS file is imported
import BaseUrl from '../BaseUrl';

const Disclaimer = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(10); // Initialize timer with 10 seconds
    const [isButtonVisible, setIsButtonVisible] = useState(false); // Track button visibility

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1); // Decrease time left by 1 every second
            }, 1000);

            return () => clearTimeout(timer); // Clear timeout if component unmounts
        } else {
            setIsButtonVisible(true); // Show button after 10 seconds
        }
    }, [timeLeft]);

    async function addConditionTwoClick(prolificId) {
        const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
        try {
          const response = await fetch(`${BaseUrl}/api/users/${prolificId}/condition-two-click`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ timestamp }), // Send the timestamp in the request body
          });
      
          if (!response.ok) {
            throw new Error('Failed to add condition two click');
          }
      
          const data = await response.json();
          // console.log(data.message); // Handle the response as needed
        } catch (error) {
          console.error('Error:', error);
        }
      }

    const handleNext = async () => {
        const prolificId = localStorage.getItem('prolificId'); // Retrieve prolificId from localStorage
        if (!prolificId) {
            return;
        }

        addConditionTwoClick(prolificId);

        navigate('/fridgecomparison');
    };

    return (
        <div className="disclaimer flex flex-col justify-center min-h-screen p-4 mx-60">
            <div className='flex flex-col items-center'>
                <img className='w-[60rem] pt-1' src='https://res.cloudinary.com/dtffdhycm/image/upload/v1731147953/FB_innovation_ti7thg.jpg' alt="FrostByte Logo"/>
                {/*<img className='w-[30rem] pt-1' src='https://res.cloudinary.com/daja3mrty/image/upload/v1729478338/frostbytelogo_mllxak.jpg' alt="FrostByte Logo"/>
                <img className='w-[30rem] pb-1' src='https://res.cloudinary.com/daja3mrty/image/upload/v1729478359/frostbytemoto_fi4kc0.jpg' alt="FrostByte Moto"/>*/}
            </div>
            {/* <p className="text-2xl mb-4">
            <span className="frostbyte">FrostByte</span> is known for its innovation and holds a large number of patents related to refrigeration technology, particularly focused on extending the freshness of food items.
            </p> */}

            {/* Right aligned button with the required size, color, and style */}
            <div className="flex justify-end">  {/* Ensures right alignment */}
                <button
                    onClick={handleNext}
                    className={`flex items-center justify-center px-5 py-2 text-white rounded-lg transition-opacity duration-300 ${isButtonVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundColor: '#007AC0', pointerEvents: isButtonVisible ? 'auto' : 'none' }} // Apply styling and visibility control
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default Disclaimer;