import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

function CaptchaComponent() {
    const navigate = useNavigate()
    const [captchaVerified, setCaptchaVerified] = useState(false); // State for CAPTCHA completion

    // Handler for CAPTCHA verification
    const handleCaptchaChange = (value) => {
        if (value) {
            setCaptchaVerified(true); // Set to true when CAPTCHA is completed
            console.log("CAPTCHA completed:", value); // You can use this value for verification on your server
        }
    };

    return (
        <div className="captcha-container">
            <h2>Complete CAPTCHA to Proceed</h2>
            <ReCAPTCHA
                sitekey="6Lcjr2kqAAAAAJWpNiAub6-hrNdQ1ChVKOnfibg5" // Replace with your reCAPTCHA site key
                onChange={handleCaptchaChange}
            />
            <button
                onClick={() => navigate('/info1')}
                disabled={!captchaVerified} // Button is enabled only if CAPTCHA is completed
                className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
            >
                Next
            </button>
        </div>
    );
}

export default CaptchaComponent;
