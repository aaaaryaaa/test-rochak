import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Page1 from './Pages/Page1';
import Page2 from './Pages/Page2';
import Page3 from './Pages/Page3';
import ProlificId from './Components/ProlificId';
import InfoPage1 from './Components/InfoPage1';
import InfoPage2 from './Components/InfoPage2';
import Consent from './Components/Consent';
import Final from './Components/Final';
import FridgeList from './Components/FridgeList';
import FridgeDetails from './Components/FridgeDetails';
import FridgeComparison from './Components/FridgeComparison';
import { AppProvider } from './Context/AppContext';
import Disclaimer from './Components/Disclaimer';
import RestOfSurvey from './Components/RestOfSurvey';

const App = () => {
    // const [route, setRoute] = useState('');

    // useEffect(() => {
    //     console.log("Sending GET request to determine the route");

    //     axios.get('http://localhost:5000/route')
    //         .then((response) => {
    //             console.log("Response received:", response.data);
    //             setRoute(response.data.route);
    //         })
    //         .catch((error) => {
    //             console.error("Error determining the route:", error);
    //         });
    // }, []);

    // if (!route) return <div>Loading...</div>;

    return (
        <AppProvider>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<Homepage />} /> */}
                    <Route path="/page1" element={<Page1 />} />
                    <Route path="/page2" element={<Page2 />} />
                    <Route path="/page3" element={<Page3 />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/" element={<Consent />} />
                    <Route path="/prolific-id" element={<ProlificId />} />
                    <Route path="/info1" element={<InfoPage1 />} />
                    <Route path="/info2" element={<InfoPage2 />} />
                    <Route path="/final" element={<Final />} />
                    <Route path="/fridgelist" element={<FridgeList />} />
                    <Route path="/fridgecomparison" element={<FridgeComparison />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/restofsurvey" element={<RestOfSurvey />} />
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default App;
