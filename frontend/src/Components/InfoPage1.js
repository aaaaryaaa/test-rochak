// components/InfoPage1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure the CSS file is imported

const InfoPage1 = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/info2');
    };

    return (
        <div className="infopage1 flex flex-col justify-center min-h-screen p-4 mx-60">
            <p className="text-2xl mb-4 leading-relaxed">
            Imagine a scenario where you’re frustrated by your fridge's lukewarm performance, recalling the nightmare that began three weeks ago when it suddenly stopped cooling entirely. A repair person offered a temporary fix, but the chill soon vanished again, and the problem resurfaced. After a thorough inspection, the inevitable was confirmed: you need a new fridge now and decide to buy a new one. Fortunately, your search led you to a selection of refrigerators that are in your budget.
            </p>
            <p className='text-2xl mb-4 leading-relaxed'>
            After some initial research, you narrowed your search to the options offered by four brands: <span className="frostbyte">FrostByte</span>, <span className="coolnest">CoolNest</span>, <span className="chillcore">ChillCore</span>, and <span className="polarpeak">PolarPeak</span>.
            </p>
            <div className="flex justify-end">  {/* Ensures right alignment */}
            <button 
                    onClick={handleNext} 
                    className="flex items-center justify-center px-5 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#007AC0' }}  // Change background color to #007AC0
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default InfoPage1;
