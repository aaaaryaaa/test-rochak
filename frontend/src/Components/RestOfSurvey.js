import React, {useState, useEffect} from 'react'
import BaseUrl from '../BaseUrl';
import '../index.css'; // Ensure the CSS file is imported

export default function RestOfSurvey() {
    const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(null);

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
        
        // Convert startTime and endTime from strings to Date objects
        const startTime = new Date(data.user.startTime);
        const endTime = new Date(data.user.endTime);

        // Calculate the time difference in milliseconds
        const timeDifference = endTime - startTime;

        // Extract minutes and seconds
        const timeInMinutes = Math.floor(timeDifference / (1000 * 60));
        const timeInSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Set the time as a string like "X minutes Y seconds"
        setTime(`${timeInMinutes} minutes and ${timeInSeconds} seconds`);
        
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

  return (
    <div className='restofsurvey flex flex-col justify-center min-h-screen p-4 mx-60'>
        <p className="text-2xl mb-4">
        Thank you for taking part in this study. Please click the button below to be redirected back to Prolific and register your submission.
            </p>
        <a className='px-4 py-2 bg-blue-500 text-white rounded text-center' href='https://app.prolific.com/submissions/complete?cc=C9GGZUQB'>Submit</a>
        {/* {time && (<div>Time taken: {time}</div>)} */}
    </div>
  )
}
