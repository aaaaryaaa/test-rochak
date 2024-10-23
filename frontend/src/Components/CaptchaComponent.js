import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

function CaptchaComponent({ setVerified }) {
    const navigate = useNavigate()
    const [captchaVerified, setCaptchaVerified] = useState(false); // State for CAPTCHA completion

    // Handler for CAPTCHA verification
    const handleCaptchaChange = (value) => {
        if (value) {
            setCaptchaVerified(true); // Set to true when CAPTCHA is completed
            setVerified(true);
            console.log("CAPTCHA completed:", value); // You can use this value for verification on your server
        }
    };

    return (
        <div className="captcha-container p-5">
            <h2 className='text-center font-bold'>Complete CAPTCHA to Proceed</h2>
            <ReCAPTCHA
                sitekey="6Ld3yWkqAAAAAORddUXP0RoFj9EIdyF7C0SwH7x-" // Replace with your reCAPTCHA site key
                onChange={handleCaptchaChange}
            />
        </div>
    );
}

export default CaptchaComponent;
