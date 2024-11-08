import React from 'react'
import '../index.css'; // Ensure the CSS file is imported

export default function NoConsent() {
  return (
    <div>
        <div className='noconsent flex flex-col justify-center min-h-screen p-4 mx-60'>
        <p className="text-2xl mb-4">
        As you do not wish to participate in this study, please close this survey and return to your submission on Prolific by selecting 'Stop without completing' button.
            </p>
        </div>
    </div>
  )
}
