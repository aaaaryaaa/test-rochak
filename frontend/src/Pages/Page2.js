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

const Page2 = () => {
  const navigate = useNavigate();
  const [hoveredFridge, setHoveredFridge] = useState(null);
  const [fridges, setFridges] = useState(fridgeData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedFridges, setSelectedFridges] = useState([]);
  const { selectedFridges, setSelectedFridges, clickedBack } = useContext(AppContext);


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
    if(clickedBack===true) navigate('/fridgecomparison')
    else navigate(`/disclaimer`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="fridge-list">
      {fridges.map((fridge, index) => (
        <div key={index} className="fridge-item flex justify-around p-3">
          <div>
            <img src={fridge.fridgeImage} alt="Refrigerator" className="fridge-image" />
            <label>
              <input
                type="checkbox"
                checked={selectedFridges.includes(fridge.name)}
                onChange={() => handleSelectFridge(fridge.name)}
                disabled={isDisabled(fridge.name)}
              />
              Select this fridge
            </label>
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
          {hoveredFridge && hoveredFridge.name === fridge.name && (
            <div className="fridge-details-popup">
              <FridgeDetails fridge={hoveredFridge} />
            </div>
          )}
        </div>
      ))}
      <div className="selection-info">
        <p>
          {selectedFridges.length < 2
            ? 'Please select at least 2 fridges.'
            : `You have selected ${selectedFridges.length} fridges.`}
        </p>
      </div>
      <button
          onClick={handleCompareClick}
          className="compare-button mt-3 p-2 bg-blue-500 text-white rounded"
          disabled={selectedFridges.length < 2}
        >
          Compare Selected Fridges
        </button>
    </div>
  );
};

export default Page2;