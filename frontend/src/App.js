import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';

// const Page1 = () => <div>Page 1</div>;
// const Page2 = () => <div>Page 2</div>;
// const Page3 = () => <div>Page 3</div>;

const App = () => {
    const [route, setRoute] = useState('');

    // useEffect(() => {
    //     axios.get('http://localhost:5000/route')
    //         .then((response) => {
    //             setRoute(response.data.route);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching the route!", error);
    //         });
    // }, []); // Empty dependency array to ensure it runs only once when the component mounts
    useEffect(() => {
      console.log("Sending GET request to determine the route");
  
      axios.get('http://localhost:5000/route')
          .then((response) => {
              console.log("Response received:", response.data);
              setRoute(response.data.route);
          })
          .catch((error) => {
              console.error("Error determining the route:", error);
          });
  }, []); // Empty dependency array ensures this runs only once

    if (!route) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>
                {route === 'page1' && <Route path="/page1" element={<Page1 />} />}
                {route === 'page2' && <Route path="/page2" element={<Page2 />} />}
                {route === 'page3' && <Route path="/page3" element={<Page3 />} />}
                {/* <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} /> */}
                <Route path="*" element={<Navigate to={`/${route}`} replace />} />
            </Routes>
        </Router>
    );
};

export default App;
