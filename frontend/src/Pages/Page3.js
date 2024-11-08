// pages/Page2.js
import React, { useContext, useEffect, useState } from 'react';
import '../Components/FridgeList.css';
import FridgeDetails from '../Components/FridgeDetails';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import BaseUrl from '../BaseUrl';

const fridgeData = [{
    name: 'coolnest1',
    fridgeImage: 'https://res.cloudinary.com/daja3mrty/image/upload/v1729480360/coolnest1_pfoip3.jpg',
    reviewImage: 'https://res.cloudinary.com/daja3mrty/image/upload/v1729480366/coolnest1review_r47fww.jpg',
    price: 649.99,
    dimensions: { height: 64.8, width: 28, depth: 30.5 },
    coolingSpace: 12.6,
    freezerSpace: 4.0,
    totalSpace: 16.6,
    productWeight: 152,
    energyConsumption: 355,
    iceMaker: true,
    garageReady: false,
    internalWaterDispenser: false,
    warranty: '1 year'
}, {
    name: 'chillcore1',
    fridgeImage: 'https://res.cloudinary.com/daja3mrty/image/upload/v1729480360/coolnest1_pfoip3.jpg',
    reviewImage: 'https://res.cloudinary.com/daja3mrty/image/upload/v1729480366/coolnest1review_r47fww.jpg',
    price: 649.99,
    dimensions: { height: 64.8, width: 28, depth: 30.5 },
    coolingSpace: 12.6,
    freezerSpace: 4.0,
    totalSpace: 16.6,
    productWeight: 152,
    energyConsumption: 355,
    iceMaker: true,
    garageReady: false,
    internalWaterDispenser: false,
    warranty: '1 year'
}, {
    name: 'frostbyte1',
    fridgeImage: 'https://res.cloudinary.com/daja3mrty/image/upload/v1729480360/coolnest1_pfoip3.jpg',
    reviewImage: 'https://res.cloudinary.com/daja3mrty/image/upload/v1729480366/coolnest1review_r47fww.jpg',
    price: 649.99,
    dimensions: { height: 64.8, width: 28, depth: 30.5 },
    coolingSpace: 12.6,
    freezerSpace: 4.0,
    totalSpace: 16.6,
    productWeight: 152,
    energyConsumption: 355,
    iceMaker: true,
    garageReady: false,
    internalWaterDispenser: false,
    warranty: '1 year'
}, {
    name: 'polarpeak1',
    fridgeImage: 'https://res.cloudinary.com/daja3mrty/image/upload/v1729480360/coolnest1_pfoip3.jpg',
    reviewImage: 'https://res.cloudinary.com/daja3mrty/image/upload/v1729480366/coolnest1review_r47fww.jpg',
    price: 649.99,
    dimensions: { height: 64.8, width: 28, depth: 30.5 },
    coolingSpace: 12.6,
    freezerSpace: 4.0,
    totalSpace: 16.6,
    productWeight: 152,
    energyConsumption: 355,
    iceMaker: true,
    garageReady: false,
    internalWaterDispenser: false,
    warranty: '1 year'
}];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
  return array;
};

const Page3 = () => {
  const navigate = useNavigate();
  const [hoveredFridge, setHoveredFridge] = useState(null);
  const [fridges, setFridges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedFridges, setSelectedFridges] = useState([]);
  const { selectedFridges, setSelectedFridges } = useContext(AppContext);


  useEffect(() => {
    const fetchFridges = async () => {
      try {
        const response = await fetch(`${BaseUrl}/api/fridges`);
        if (!response.ok) {
          throw new Error('Failed to fetch fridges');
        }
        const data = await response.json();
        const shuffledFridges = shuffleArray(data); // Shuffle the fridges here
        setFridges(shuffledFridges);
  
        const shuffledNameIds = shuffledFridges.map(fridge => fridge.nameId);
        // Send the PATCH request to update the user's shuffledFridges field
        await updateUserShuffledFridges(shuffledNameIds);
  
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFridges();
  }, []);
  
  // Function to send a PATCH request to update shuffledFridges in the user document
  const updateUserShuffledFridges = async (shuffledFridges) => {
    try {
      const prolificId = localStorage.getItem('prolificId')/* Retrieve the user's prolificId here */;
      const response = await fetch(`${BaseUrl}/api/users/${prolificId}/fridgeshuffle`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shuffledFridges }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update shuffledFridges');
      }
  
      const result = await response.json();
      // console.log('User updated successfully:', result);
    } catch (error) {
      console.error('Error updating shuffledFridges:', error);
    }
  };

  const handleSelectFridge = (fridgeName, fridgeNameId) => {
    const currentTime = new Date().toISOString();

    // Check if the fridge is already selected
    const fridgeIndex = selectedFridges.findIndex(
      (item) => item.fridgeName === fridgeName
    );

    if (fridgeIndex !== -1) {
      // If already selected, remove it
      const updatedFridges = selectedFridges.filter(
        (item) => item.fridgeName !== fridgeName
      );
      setSelectedFridges(updatedFridges);
    } else {
      // If not selected and selection count is below 4, add it with the timestamp
      if (selectedFridges.length < 4) {
        setSelectedFridges([
          ...selectedFridges,
          { fridgeName, selectTime: currentTime, fridgeNameId },
        ]);
      } else {
        alert('You can only select a maximum of 4 fridges.');
      }
    }
  };

  const isDisabled = (fridgeName) => {
    return (
      selectedFridges.length >= 4 &&
      !selectedFridges.some((item) => item.fridgeName === fridgeName)
    );
  };

  async function addComparisonClick(prolificId) {
    const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
    try {
      const response = await fetch(`${BaseUrl}/api/users/${prolificId}/comparison-click`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp }), // Send the timestamp in the request body
      });
  
      if (!response.ok) {
        throw new Error('Failed to add comparison click');
      }
  
      const data = await response.json();
      // console.log(data.message); // Handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleCompareClick = async () => {
    if (selectedFridges.length < 2) {
      alert('Please select at least 2 fridges for comparison.');
      return;
    }
  
    try {
      // Replace 'userId' with the actual user ID you want to update
      const prolificId = localStorage.getItem('prolificId'); // Make sure you replace this with the correct user ID
      const response = await fetch(`${BaseUrl}/api/users/${prolificId}/updateFridgeSelection`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fridgeSelection: selectedFridges
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update fridge selection.');
      }
  
      const data = await response.json();
      // console.log('Fridge selection updated successfully:', data);

      addComparisonClick(prolificId);
  
      // Navigate to the comparison page
      navigate(`/fridgecomparison`);
    } catch (error) {
      console.error('Error updating fridge selection:', error);
      alert('An error occurred while updating the fridge selection. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <div className='flex'>
        <div className='fridge-list w-full'>
          {fridges.map((fridge, index) => (
            <div key={index} className="fridge-item  p-3">
              <div className='flex justify-around'>
                <div>
                  <img src={fridge.fridgeImage} alt="Refrigerator" className="fridge-image" />
                </div>
                <div
                  className="fridge-details flex-col gap-4"
                >
                  {/* <p className='text-lg font-bold'>{fridge.name.toUpperCase()}</p> */}
                  <div className='w-full'>
                    <img src={fridge.fridgeLogo} alt="fridgeLogo" className='ml-auto mr-auto' />
                  </div>
                  <p className="fridge-price">${fridge.price}</p>
                  <div className="fridge-rating">
                    <img src={fridge.reviewImage} alt="Rating" />
                  </div>
                  <h3>{fridge.totalSpace} Cu. Ft. Refrigerator</h3>
                  <p>Cooling space: {fridge.coolingSpace} Cu. Ft.</p>
                  <p>Freezer space: {fridge.freezerSpace} Cu. Ft.</p>
                  <p className='py-5 text-blue-300' 
                  onMouseEnter={() => setHoveredFridge(fridge)}
                  onMouseLeave={() => setHoveredFridge(null)}
                  >
                    Hover here for more details
                  </p>
                </div>
              </div>
              {/* {hoveredFridge && hoveredFridge.name === fridge.name && (
                <div className="fridge-details-popup">
                  <FridgeDetails fridge={hoveredFridge} />
                </div>
              )} */}
                <label className="space-x-2 ml-auto mr-auto w-full">
                  <input
                    type="checkbox"
                    checked={selectedFridges.some(
                      (item) => item.fridgeName === fridge.name
                    )}
                    onChange={() => handleSelectFridge(fridge.name, fridge.nameId)}
                    disabled={isDisabled(fridge.name)}
                    className="form-checkbox h-3 w-3 text-blue-600 rounded focus:ring focus:ring-offset-0 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className="text-blue-400 text-sm">Compare</span>
                </label>

            </div>
          ))}
        </div>
        <div className='w-[40%]'>
          {hoveredFridge && (
            <div className="">
              <FridgeDetails fridge={hoveredFridge} />
            </div>
          )}
          {/* <div className=''>
            <div className="">
              <p className='text-center'>
                {selectedFridges.length < 2
                  ? 'Please select at least 2 fridges.'
                  : `You have selected ${selectedFridges.length} fridges.`}
              </p>
            </div>
            <button
                onClick={handleCompareClick}
                className="flex justify-center bg-blue-500 text-white rounded"
                disabled={selectedFridges.length < 2}
              >
                Compare Selected Fridges
            </button>
          </div> */}
          <div className="flex flex-col items-center justify-center h-[20rem]">
            <div className="mb-4">
              <p className="text-center">
                {selectedFridges.length < 2
                  ? 'Please select at least 2 fridges.'
                  : `You have selected ${selectedFridges.length} fridges. (Maximum allowed: 4)`}
              </p>
            </div>
            <button
              onClick={handleCompareClick}
              className="bg-blue-500 text-white rounded px-4 py-2"
              disabled={selectedFridges.length < 2}
            >
              Compare Selected Fridges
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;