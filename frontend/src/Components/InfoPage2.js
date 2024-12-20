// components/InfoPage2.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../BaseUrl';
import axios from 'axios';
import '../index.css'; // Ensure the CSS file is imported

const InfoPage2 = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const prolificId = localStorage.getItem('prolificId'); // Retrieve prolificId from localStorage

    useEffect(() => {
        const prolificId = localStorage.getItem('prolificId'); // Get prolificId from localStorage
    
        const fetchUser = async () => {
          try {
            const response = await fetch(`${BaseUrl}/api/users/${prolificId}`);
    
            if (!response.ok) {
              throw new Error('Failed to fetch user');
            }
    
            const data = await response.json();
            setUser(data.user);
            console.log(user);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        if (prolificId) {
          fetchUser();
        } else {
          setError('No prolificId found');
          setLoading(false);
        }
      }, []);

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
    
      async function addStartConditionClick(prolificId) {
        const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
        try {
          const response = await fetch(`${BaseUrl}/api/users/${prolificId}/startcondition-click`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ timestamp }), // Send the timestamp in the request body
          });
      
          if (!response.ok) {
            throw new Error('Failed to add start condition click');
          }
      
          const data = await response.json();
          // console.log(data.message); // Handle the response as needed
        } catch (error) {
          console.error('Error:', error);
        }
      }
    
    const handleRedirect = () => {
        setLoading(true); // Set loading to true when button is clicked

        // Fetch the route distribution logic from the server
        axios.get(`${BaseUrl}/api/route`)
            .then((response) => {
                const targetRoute = user.page!==''? user.page : response.data.route;

                // Make a PATCH request to update the user's page field
                axios.patch(`${BaseUrl}/api/users/update-page`, {
                    prolificId: prolificId,
                    page: targetRoute
                })
                .then(() => {
                    if(targetRoute!=='page1') addStartConditionClick(prolificId);
                    if(user.page==='') navigate(`/${targetRoute}`);
                    else navigate(`/${user.page}`);
                })
                .catch((error) => {
                    console.error('Error updating user page:', error);
                    setLoading(false); // Reset loading if there's an error
                });
            })
            .catch((error) => {
                console.error("Error determining the route!", error);
                setLoading(false); // Reset loading if there's an error
            });
    };

    // const handleNext = () => {
    //     navigate('/final');
    // };

    return (
        <div className="infopage2 flex flex-col justify-center min-h-screen p-4 mx-60">
            <p className="text-2xl mb-4 leading-relaxed">
                Further you will be presented with various refrigerator models from these four brands. Hover on any model to view its full specifications, which would be displayed on the right side of the screen.
                You are free to select up to 4 models for comparison.
            </p>
            <p className="text-2xl mb-4 leading-relaxed">
                The interactive design allows you to revisit the options screen at any time to adjust the models you are comparing.
                Once you’ve completed your comparisons, you have to make a final choice from the options you’ve selected.
            </p>
            <div className="flex justify-end">  {/* Ensures right alignment */}
            <button
                    onClick={handleRedirect}
                    className={`flex items-center justify-center px-5 py-2 text-white rounded-lg transition-opacity duration-300 ${isButtonVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundColor: '#007AC0', pointerEvents: isButtonVisible ? 'auto' : 'none' }} // Apply styling and visibility control
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default InfoPage2;
