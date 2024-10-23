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
  const [fridges, setFridges] = useState(fridgeData);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFridges();
  }, []);

  const handleSelectFridge = (fridgeName) => {
    if (selectedFridges.includes(fridgeName)) {
      setSelectedFridges(selectedFridges.filter((name) => name !== fridgeName));
    } else {
      if (selectedFridges.length < 4) {
        setSelectedFridges([...selectedFridges, fridgeName]);
        console.log([...selectedFridges, fridgeName]);
      } else {
        alert('You can only select a maximum of 4 fridges.');
      }
    }
  };

  const isDisabled = (fridgeName) => {
    return (
      selectedFridges.length >= 4 && !selectedFridges.includes(fridgeName)
    );
  };

  const handleCompareClick = () => {
    if (selectedFridges.length < 2) {
      alert('Please select at least 2 fridges for comparison.');
      return;
    }
    navigate(`/fridgecomparison`);
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
                  <p className='text-lg font-bold'>{fridge.name.toUpperCase()}</p>
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
                    checked={selectedFridges.includes(fridge.name)}
                    onChange={() => handleSelectFridge(fridge.name)}
                    disabled={isDisabled(fridge.name)}
                    className="form-checkbox h-3 w-3 text-blue-600 rounded focus:ring focus:ring-offset-0 focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className="text-blue-400 text-sm">Select this fridge</span>
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