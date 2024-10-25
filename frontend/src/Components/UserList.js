import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/users`); // Adjust the API endpoint if necessary
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const downloadCSV = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/users/download`, {
        responseType: 'blob', // Important to handle binary data
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv'); // Specify the file name
      document.body.appendChild(link);
      link.click();
      
      // Clean up the link element
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error downloading CSV:', err);
      alert('Failed to download CSV. Please try again later.');
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      <button onClick={downloadCSV}>Download CSV</button>
      <table>
        <thead>
          <tr>
            <th>Prolific ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Page</th>
            <th>Selected Option</th>
            <th>Fridge Selection Matrix</th>
            <th>Form Data</th>
            <th>Comparison Clicks</th>
            <th>Select Fridge Clicks</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.prolificId}>
              <td>{user.prolificId}</td>
              <td>{new Date(user.startTime).toLocaleString()}</td>
              <td>{new Date(user.endTime).toLocaleString()}</td>
              <td>{user.page}</td>
              <td>{user.selectedOption}</td>
              <td>{JSON.stringify(user.fridgeSelectionMatrix)}</td>
              <td>{JSON.stringify(user.formData)}</td>
              <td>{JSON.stringify(user.comparisonClick)}</td>
              <td>{JSON.stringify(user.selectFridgeClick)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
