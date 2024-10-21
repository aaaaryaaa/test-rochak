import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';

const FridgeComparison = () => {
  const {selectedFridges} = useContext(AppContext);
  const [fridgesToCompare, setFridgesToCompare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedFridges.length < 2 || selectedFridges.length > 4) {
      setError('Please select a minimum of 2 and a maximum of 4 fridges to compare.');
      setLoading(false);
      return;
    }

    // const fetchFridgesToCompare = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:5000/api/fridges/compare?names=${selectedFridges.join(',')}`);
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch fridges for comparison');
    //     }
    //     const data = await response.json();
    //     setFridgesToCompare(data);
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchFridgesToCompare = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/fridges/compare', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ names: selectedFridges }), // Send the array directly
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch fridges for comparison');
          }
          const data = await response.json();
          setFridgesToCompare(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      

    fetchFridgesToCompare();
  }, [selectedFridges]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {fridgesToCompare.map((fridge, index) => (
        <div key={index} className="border p-4 rounded shadow-lg bg-white">
          <img src={fridge.fridgeImage} alt={fridge.name} className="w-full h-40 object-cover mb-2" />
          <h2 className="text-lg font-semibold">{fridge.name}</h2>
          <p className="text-xl font-bold text-blue-500">${fridge.price}</p>
          <p className="text-gray-600">Dimensions: {fridge.dimensions.height} x {fridge.dimensions.width} x {fridge.dimensions.depth} in</p>
          <p className="text-gray-600">Cooling Space: {fridge.coolingSpace} Cu. Ft.</p>
          <p className="text-gray-600">Freezer Space: {fridge.freezerSpace} Cu. Ft.</p>
          <p className="text-gray-600">Total Space: {fridge.totalSpace} Cu. Ft.</p>
          <p className="text-gray-600">Energy Consumption: {fridge.energyConsumption} kWh/year</p>
          <p className="text-gray-600">Ice Maker: {fridge.iceMaker ? 'Yes' : 'No'}</p>
          <p className="text-gray-600">Garage Ready: {fridge.garageReady ? 'Yes' : 'No'}</p>
          <p className="text-gray-600">Internal Water Dispenser: {fridge.internalWaterDispenser ? 'Yes' : 'No'}</p>
          <p className="text-gray-600">Warranty: {fridge.warranty}</p>
        </div>
      ))}
    </div>
  );
};

export default FridgeComparison;
