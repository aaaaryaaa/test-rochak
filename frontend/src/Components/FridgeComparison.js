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

  // useEffect(() => {
  //   if (selectedFridges.length < 2 || selectedFridges.length > 4) {
  //     setError('Please select a minimum of 2 and a maximum of 4 fridges to compare.');
  //     setLoading(false);
  //     return;
  //   }

  //   const fetchFridgesToCompare = async () => {
  //     try {
  //       const response = await fetch(`${BaseUrl}/api/fridges/compare`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ names: selectedFridges }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch fridges for comparison');
  //       }
  //       const data = await response.json();
  //       setFridgesToCompare(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFridgesToCompare();
  // }, [selectedFridges]);
  useEffect(() => {
    // Ensure selectedFridges is an array of objects and extract names
    const fridgeNames = selectedFridges.map((fridge) => fridge.fridgeName);
  
    if (fridgeNames.length < 2 || fridgeNames.length > 4) {
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
          body: JSON.stringify({ names: fridgeNames }), // Use fridgeNames instead of selectedFridges
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

  async function addSelectFridgeClick(prolificId) {
  const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
  try {
    const response = await fetch(`${BaseUrl}/api/users/${prolificId}/select-fridge-click`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timestamp }), // Send the timestamp in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to add select fridge click');
    }

    const data = await response.json();
    // console.log(data.message); // Handle the response as needed
  } catch (error) {
    console.error('Error:', error);
  }
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
          // endTime: new Date(),
          selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user selection');
      }

      const data = await response.json();
      // console.log('User updated successfully:', data);

      addSelectFridgeClick(prolificId);

      navigate('/surveyform');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Prepare the attributes for comparison
  const attributes = [
    { label: '', key: 'fridgeImage', format: (value) => <img src={value} alt="Fridge" className="max-h-40 mx-auto" /> },
    { label: 'Price', key: 'price' },
    { label: 'Dimensions (H x W x D)', key: 'dimensions', format: (value) => `${value.height} x ${value.width} x ${value.depth} in` },
    { label: 'Cooling Space', key: 'coolingSpace', suffix: ' Cu. Ft.' },
    { label: 'Freezer Space', key: 'freezerSpace', suffix: ' Cu. Ft.' },
    { label: 'Total Space', key: 'totalSpace', suffix: ' Cu. Ft.' },
    { label: 'Energy Consumption', key: 'energyConsumption', suffix: ' kWh/year' },
    { label: 'Ice Maker', key: 'iceMaker', format: (value) => (value ? 'Yes' : 'No') },
    { label: 'Garage Ready', key: 'garageReady', format: (value) => (value ? 'Yes' : 'No') },
    { label: 'Internal Water Dispenser', key: 'internalWaterDispenser', format: (value) => (value ? 'Yes' : 'No') },
    { label: 'Warranty', key: 'warranty' },
  ];

  return (
    <div className="p-4">
      <button onClick={handleGoBack} className="bg-blue-500 text-[2rem] text-white py-2 px-4 rounded hover:bg-gray-400 mt-4">
        🔙 to selection
      </button>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b"></th>
              {fridgesToCompare.map((fridge, index) => (
                <th key={index} className="py-2 px-4 border-b text-center"><img src={fridge.fridgeLogo} alt='fridgeLogo' className='ml-auto mr-auto' /></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b font-semibold">{attribute.label}</td>
                {fridgesToCompare.map((fridge, idx) => (
                  <td key={idx} className="py-2 px-4 border-b text-center">
                    {attribute.format
                      ? attribute.format(fridge[attribute.key])
                      : `${fridge[attribute.key] || ''}${attribute.suffix || ''}`}
                  </td>
                ))}
              </tr>
            ))}
            {/* Add an extra row for the Select button */}
            <tr>
              <td className="py-2 px-4 border-b font-semibold"></td>
              {fridgesToCompare.map((fridge, idx) => (
                <td key={idx} className="py-2 px-4 border-b text-center">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400 mt-4"
                    onClick={() => handleSelection(fridge.name)}
                  >
                    Add to cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-gray-400 mt-4"
        onClick={() => handleSelection('nota')}
      >
        Add none of these
      </button>
    </div>
  );
};

export default FridgeComparison;
