import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../BaseUrl';

const FridgeComparison = () => {
  const navigate = useNavigate();
  const { selectedFridges } = useContext(AppContext);
  const [fridgesToCompare, setFridgesToCompare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { setClickedBack } = useContext(AppContext);

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

  useEffect(() => {
    if (selectedFridges.length < 2 || selectedFridges.length > 4) {
      setError('Please select a minimum of 2 and a maximum of 4 fridges to compare.');
      setLoading(false);
      return;
    }

    const fetchFridgesToCompare = async () => {
      try {
        const response = await fetch(`${BaseUrl}/api/fridges/compare`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ names: selectedFridges }),
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

  const handleGoBack = () => {
    setClickedBack(true);
    if(user.page === "page1") navigate("/fridgelist");
    if(user.page === "page2") navigate("/page2");
    if(user.page === "page3") navigate("/page3");
  }

  const handleSelection = async (selectedOption) => {
    const prolificId = localStorage.getItem('prolificId'); // Retrieve prolificId from localStorage
    if (!prolificId) {
      setError('User not found. Please log in again.');
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/api/users/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prolificId,
          endTime: new Date(),
          selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user selection');
      }

      const data = await response.json();
      console.log('User updated successfully:', data);

      navigate('/restofsurvey');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:max-grid-cols-4 gap-6 p-4">
      <div className="col-span-full">
        <button onClick={handleGoBack} className="bg-blue-500 text-[2rem] text-white py-2 px-4 rounded hover:bg-gray-400 mt-4">🔙 to selection</button>
      </div>
      {fridgesToCompare.map((fridge, index) => (
        <div key={index} className="border p-4 rounded shadow-lg bg-white flex h-[20rem]">
          <img src={fridge.fridgeImage} alt={fridge.name} className="h-[100%] object-cover p-5" />
          <div className="p-0 text-center w-full">
            <h2 className="text-lg font-semibold">{fridge.name}</h2>
            <p className="text-xl font-bold text-blue-500">${fridge.price}</p>
            <p className="text-[0.8rem] text-gray-600">Dimensions: {fridge.dimensions.height} x {fridge.dimensions.width} x {fridge.dimensions.depth} in</p>
            <p className="text-[0.8rem] text-gray-600">Cooling Space: {fridge.coolingSpace} Cu. Ft.</p>
            <p className="text-[0.8rem] text-gray-600">Freezer Space: {fridge.freezerSpace} Cu. Ft.</p>
            <p className="text-[0.8rem] text-gray-600">Total Space: {fridge.totalSpace} Cu. Ft.</p>
            <p className="text-[0.8rem] text-gray-600">Energy Consumption: {fridge.energyConsumption} kWh/year</p>
            <p className="text-[0.8rem] text-gray-600">Ice Maker: {fridge.iceMaker ? 'Yes' : 'No'}</p>
            <p className="text-[0.8rem] text-gray-600">Garage Ready: {fridge.garageReady ? 'Yes' : 'No'}</p>
            <p className="text-[0.8rem] text-gray-600">Internal Water Dispenser: {fridge.internalWaterDispenser ? 'Yes' : 'No'}</p>
            <p className="text-[0.8rem] text-gray-600">Warranty: {fridge.warranty}</p>
            <button
              className="col-span-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400 mt-4"
              onClick={() => handleSelection(fridge.name)}
            >
              Select
            </button>
          </div>
        </div>
      ))}
      <button
        className="col-span-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400 mt-4"
        onClick={() => handleSelection('nota')}
      >
        Select none of these
      </button>
    </div>
  );
};

export default FridgeComparison;
