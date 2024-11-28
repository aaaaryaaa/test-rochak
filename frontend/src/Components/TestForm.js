import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import { useNavigate } from 'react-router-dom';

const TestForm = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState({
    pageA: {
      Ex1expertise: null,
      Ex2knowledge: null,
      Ex3commitmentUS: null,
      //removed Ex4 and Ex5
    },
    specificEvents: {
      RFQ1unableToGetWhatYouWant: null,
      RFQ2crossTheLine: null,
      RFQ3accomplishmentsPsyched: null,
      RFQ4getOnParentsNerves: null,
      RFQ5obeyRules: null,
      ACreadCarefully: null,
      RFQ6actObjectionable: null,
      RFQ7doWellAtThings: null,
      RFQ8notCarefulTrouble: null,
      RFQ9underperformingGoals: null,
      RFQ10progressTowardSuccess: null,
      RFQ11fewHobbiesInterest: null,
    },
    satisfactionStatements: {
      MS1carRadioCheckStations: null,
      MS2lookoutBetterJobs: null,
      MS3shopForGift: null,
      MS4rentingVideosDifficult: null,
      MS5highestStandards: null,
      MS6neverSettleSecondBest: null,
    },
    demographics: {
      age: '',
      gender: '',
      fridgePurchase: '',
      MC1brandInnovative: '',       // Added for MC1
      MC2frostByteInfoTime: '',    // Added for MC2
      AC2readCarefully: '',        // Added for AC2
      AC2otherReadCarefully: ''
    },
    commentOnStudy: ''
  });

  useEffect(() => {
    if (currentPage === 1) {
      window.scrollTo(0, 0); // Scroll to the top when page 1 is rendered
    }
  }, [currentPage]);

  //removed fields from pageA
  // Ex4commitmentCategory: null,
  // Ex5investmentCategory: null,

  //removed fields from surveyform
  // ethnicBackground: '',
  // englishProficiency: null,

  // Handling input changes for each section
  const handleInputChange = (section, field, value) => {
    setSurveyData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setSurveyData((prevData) => ({
      ...prevData,
      commentOnStudy: value
    }));
  };

  const validateForm = () => {
    // Check required fields in pageA
    // const pageAFields = ['Ex1expertise', 'Ex2knowledge', 'Ex3commitmentUS', 'Ex4commitmentCategory', 'Ex5investmentCategory']; // Add other required fields if necessary
    // for (let field of pageAFields) {
    //   if (surveyData.pageA[field] === null) {
    //     return false; // Field is empty
    //   }
    // }
    const pageAFields = Object.keys(surveyData.pageA);
    for (let field of pageAFields) {
      if (surveyData.pageA[field] === null) {
        return false; // Field is empty
      }
    }

    // Check specific events
    const specificEventsFields = Object.keys(surveyData.specificEvents);
    for (let field of specificEventsFields) {
      if (surveyData.specificEvents[field] === null) {
        return false; // Field is empty
      }
    }

    const satisfactionStatementsFields = Object.keys(surveyData.satisfactionStatements);
    for (let field of satisfactionStatementsFields) {
      if (surveyData.satisfactionStatements[field] === null) {
        return false; // Field is empty
      }
    }

    // Check demographics (if needed)
    const demographicFields = ['age', 'gender', 'fridgePurchase', 'MC1brandInnovative', 'MC2frostByteInfoTime', 'AC2readCarefully'];
    for (let field of demographicFields) {
      if (!surveyData.demographics[field]) {
        return false; // Field is empty
      }
    }

    return true; // All fields are filled
  };

//   const isAgeValid = (age) => {
//     const intAge = parseInt(age, 10);
//     return intAge >= 18 && intAge <= 100;
// };
    const isAgeValid = (age) => {
        const trimmedAge = age.trim(); // Remove leading/trailing spaces
        if (trimmedAge === "") return false; // Age is empty
        const intAge = parseInt(trimmedAge, 10);
        return !isNaN(intAge) && intAge >= 18 && intAge <= 100;  // Validates if it's a number and within range
    };
  

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isAgeValid(surveyData.demographics.age)){
        alert('Please ensure age is between 18 and 100');
        return;
    }

    // Validate form data
    if (!validateForm()) {
        alert('Please answer all the questions.');
        return;
      }

    // Fetch the Prolific ID from localStorage
    const prolificId = localStorage.getItem('prolificId');
    if (!prolificId) {
      alert('No Prolific ID found!');
      return;
    }

    // Add formData to the PATCH request body
    const dataToSubmit = {
      prolificId,
      formData: surveyData,
      endTime: new Date(),
    };

    try {
      // Make PATCH request to the server
      const response = await axios.patch(`${BaseUrl}/api/users/updateform`, dataToSubmit);
    //   console.log(response);
      navigate("/restofsurvey");
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  // Total number of pages
  const totalPages = 5;

  // Handle Next and Previous page navigation
  const goToNextPage = () => {
    let flag=true;
    if(currentPage===1){
      const pageAFields = Object.keys(surveyData.pageA);
        for (let field of pageAFields) {
        if (surveyData.pageA[field] === null) {
          alert('Please answer all the questions.');
          return;//flag=false; // Field is empty
        }
      }
      // if(surveyData.specificEvents.ACreadCarefully === null){
      //   alert("Please fill all details!");
      //   return;
      // }
    }
    if(currentPage===2){
      const specificEventsFields = Object.keys(surveyData.specificEvents);
      for (let field of specificEventsFields) {
        if (surveyData.specificEvents[field] === null) {
          alert('Please answer all the questions.');
          return;//flag=false; // Field is empty
        }
      }
    }
    if(currentPage===3){
      const satisfactionStatementsFields = Object.keys(surveyData.satisfactionStatements);
      for (let field of satisfactionStatementsFields) {
        if (surveyData.satisfactionStatements[field] === null) {
          alert('Please answer all the questions.');
          return;//flag=false; // Field is empty
        }
      }
      if(surveyData.demographics.MC1brandInnovative === ''){
        alert("Please fill all details!");
        return;
      }
    }
    if(currentPage===4){
      if(!isAgeValid(surveyData.demographics.age)){
          alert('Please ensure age is between 18 and 100');
          return;
      }
      const demographicFields = ['age', 'gender', 'fridgePurchase', 'MC1brandInnovative', 'MC2frostByteInfoTime', 'AC2readCarefully'];
      for (let field of demographicFields) {
        if (!surveyData.demographics[field]) {
          alert('Please answer all the questions.');
          return;//flag=false; // Field is empty
        }
      }
    }
    if (currentPage < totalPages && flag) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo(0, 0); // to scroll top
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  
  // Render the appropriate content for the current page
  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <div className="testform flex flex-col justify-center min-h-screen p-4 leading-relaxed" style={{ marginLeft: '4rem', marginRight: '4rem' }}>
            <h2 className="que text-xl" style={{ marginTop: '-3rem' }}>Please respond to the following questions by selecting the appropriate option.</h2>
        <div className=''>
            {/* Ex1Expertise in product category */}
            <label className="que block font-medium mt-14 mb-8">How much expertise do you think <span className="frostbyte">FrostByte</span> has in refrigerators?</label>
            <div className="opt flex space-x-4 justify-center">
              <span style={{ marginRight: '0.5rem' }}>Not at all</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`Ex1expertise-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="Ex1expertise"
                    value={value}
                    checked={surveyData.pageA.Ex1expertise === value}
                    onChange={(e) => handleInputChange('pageA', 'Ex1expertise', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Extremely high</span>
            </div>

            {/* Ex2Knowledge regarding the product category */}
            <label className="que block font-medium mt-14 mb-8">How much knowledge do you think <span className="frostbyte">FrostByte</span> has regarding refrigerators?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Not at all</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`Ex2knowledge-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="Ex2knowledge"
                    value={value}
                    checked={surveyData.pageA.Ex2knowledge === value}
                    onChange={(e) => handleInputChange('pageA', 'Ex2knowledge', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Extremely high</span>
            </div>

            {/* Commitment to success in the U.S. refrigerators market */}
            <label className="que block font-medium mt-14 mb-8">How specialized do you think <span className="frostbyte">FrostByte</span> is in refrigerators?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Not at all</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`Ex3commitmentUS-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="Ex3commitmentUS"
                    value={value}
                    checked={surveyData.pageA.Ex3commitmentUS === value}
                    onChange={(e) => handleInputChange('pageA', 'Ex3commitmentUS', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Extremely high</span>
            </div>

            {/* Commitment to the product category */}
            {/* <label className="que block font-medium mt-14 mb-8">TO BE REMOVED1</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>None at all</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`Ex4commitmentCategory-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="Ex4commitmentCategory"
                    value={value}
                    checked={surveyData.pageA.Ex4commitmentCategory === value}
                    onChange={(e) => handleInputChange('pageA', 'Ex4commitmentCategory', parseInt(e.target.value))}
                    />
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>A great deal</span>
            </div> */}

            {/* Investment in the product category */}
            {/* <label className="que block font-medium mt-14 mb-8">TO BE REMOVED2</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>None at all</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`Ex5investmentCategory-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="Ex5investmentCategory"
                    value={value}
                    checked={surveyData.pageA.Ex5investmentCategory === value}
                    onChange={(e) => handleInputChange('pageA', 'Ex5investmentCategory', parseInt(e.target.value))}
                    />
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>A great deal</span>
            </div> */}

            
            </div>
          </div>
        );
      case 2:
        return (
          <div className="testform flex flex-col justify-center min-h-screen p-4 leading-relaxed" style={{ marginLeft: '4rem', marginRight: '4rem' }}>
            <h2 className="que text-xl mt-9">This set of questions asks you about specific events in your life. Please indicate your answer to each question by selecting the appropriate option.</h2>
            <div className=''>
            {/* RFQ1 */}
            <label className="que block font-medium mt-14 mb-8">Compared to most people, are you typically unable to get what you want out of life?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ1unableToGetWhatYouWant-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ1unableToGetWhatYouWant"
                    value={value}
                    checked={surveyData.specificEvents.RFQ1unableToGetWhatYouWant === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ1unableToGetWhatYouWant', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Very often&nbsp;&nbsp;</span>
            </div>

            {/* RFQ2 */}
            <label className="que block font-medium mt-14 mb-8">Growing up, would you ever “cross the line” by doing things that your parents would not tolerate?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ2crossTheLine-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ2crossTheLine"
                    value={value}
                    checked={surveyData.specificEvents.RFQ2crossTheLine === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ2crossTheLine', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Very often&nbsp;&nbsp;</span>
            </div>

            {/* RFQ3 */}
            <label className="que block font-medium mt-14 mb-8">How often have you accomplished things that got you "psyched" to work even harder?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ3accomplishmentsPsyched-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ3accomplishmentsPsyched"
                    value={value}
                    checked={surveyData.specificEvents.RFQ3accomplishmentsPsyched === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ3accomplishmentsPsyched', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Many times</span>
            </div>

            {/* RFQ4 */}
            <label className="que block font-medium mt-14 mb-8">Did you get on your parents’ nerves often when you were growing up?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ4getOnParentsNerves-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ4getOnParentsNerves"
                    value={value}
                    checked={surveyData.specificEvents.RFQ4getOnParentsNerves === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ4getOnParentsNerves', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Very often&nbsp;&nbsp;</span>
            </div>

            {/* RFQ5 */}
            <label className="que block font-medium mt-14 mb-8">How often did you obey rules and regulations that were established by your parents?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ5obeyRules-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ5obeyRules"
                    value={value}
                    checked={surveyData.specificEvents.RFQ5obeyRules === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ5obeyRules', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Always&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>

            {/* AC */}
            <label className="que block font-medium mt-14 mb-8">If you are reading this question carefully, please select the fourth option from the right.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`ACreadCarefully-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="ACreadCarefully"
                    value={value}
                    checked={surveyData.specificEvents.ACreadCarefully === value}
                    onChange={(e) => handleInputChange('specificEvents', 'ACreadCarefully', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Always&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>

            {/* RFQ6 */}
            <label className="que block font-medium mt-14 mb-8">Growing up, did you ever act in ways that your parents thought were objectionable?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ6actObjectionable-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ6actObjectionable"
                    value={value}
                    checked={surveyData.specificEvents.RFQ6actObjectionable === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ6actObjectionable', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Very often&nbsp;&nbsp;</span>
            </div>

            {/* RFQ7 */}
            <label className="que block font-medium mt-14 mb-8">Do you often do well at different things that you try?</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ7doWellAtThings-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ7doWellAtThings"
                    value={value}
                    checked={surveyData.specificEvents.RFQ7doWellAtThings === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ7doWellAtThings', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Very often&nbsp;&nbsp;</span>
            </div>

            {/* RFQ8 */}
            <label className="que block font-medium mt-14 mb-8">Not being careful enough has gotten me into trouble at times.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Never or seldom</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ8notCarefulTrouble-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ8notCarefulTrouble"
                    value={value}
                    checked={surveyData.specificEvents.RFQ8notCarefulTrouble === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ8notCarefulTrouble', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Very often&nbsp;&nbsp;</span>
            </div>

            {/* RFQ9 */}
            <label className="que block font-medium mt-14 mb-8">When it comes to achieving things that are important to me, I find that I don't perform as well as I ideally would like to do.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Never true</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ9underperformingGoals-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ9underperformingGoals"
                    value={value}
                    checked={surveyData.specificEvents.RFQ9underperformingGoals === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ9underperformingGoals', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Very often true</span>
            </div>

            {/* RFQ10 */}
            <label className="que block font-medium mt-14 mb-8">I feel like I have made progress toward being successful in my life.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Certainly false</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ10progressTowardSuccess-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ10progressTowardSuccess"
                    value={value}
                    checked={surveyData.specificEvents.RFQ10progressTowardSuccess === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ10progressTowardSuccess', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Certainly true</span>
            </div>

            {/* RFQ11 */}
            <label className="que block font-medium mt-14 mb-8">I have found very few hobbies or activities in my life that capture my interest or motivate me to put effort into them.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Certainly false</span>
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`RFQ11fewHobbiesInterest-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="RFQ11fewHobbiesInterest"
                    value={value}
                    checked={surveyData.specificEvents.RFQ11fewHobbiesInterest === value}
                    onChange={(e) => handleInputChange('specificEvents', 'RFQ11fewHobbiesInterest', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Certainly true</span>
            </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="testform flex flex-col justify-center min-h-screen p-4 leading-relaxed" style={{ marginLeft: '4rem', marginRight: '4rem' }}>
            <h2 className="que text-xl mt-9">Please respond to the following statements by selecting the appropriate option.</h2>
            <div className=''>
            {/* MS1 */}
            <label className="que block font-medium mt-14 mb-8">When I am in the car listening to the radio, I often check other stations to see if something better is playing, even if I’m relatively satisfied with what I’m listening to.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Strongly disagree</span>
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`MS1carRadioCheckStations-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="MS1carRadioCheckStations"
                    value={value}
                    checked={surveyData.satisfactionStatements.MS1carRadioCheckStations === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'MS1carRadioCheckStations', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Strongly agree</span>
            </div>

            {/* MS2 */}
            <label className="que block font-medium mt-14 mb-8">No matter how satisfied I am with my job, it’s only right for me to be on the lookout for better opportunities.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Strongly disagree</span>
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`MS2lookoutBetterJobs-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="MS2lookoutBetterJobs"
                    value={value}
                    checked={surveyData.satisfactionStatements.MS2lookoutBetterJobs === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'MS2lookoutBetterJobs', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Strongly agree</span>
            </div>

            {/* MS3 */}
            <label className="que block font-medium mt-14 mb-8">I often find it difficult to shop for a gift for a friend.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Strongly disagree</span>
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`MS3shopForGift-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="MS3shopForGift"
                    value={value}
                    checked={surveyData.satisfactionStatements.MS3shopForGift === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'MS3shopForGift', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Strongly agree</span>
            </div>

            {/* MS4 */}
            <label className="que block font-medium mt-14 mb-8">When shopping, I have a hard time finding clothing that I really love.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Strongly disagree</span>
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`MS4rentingVideosDifficult-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="MS4rentingVideosDifficult"
                    value={value}
                    checked={surveyData.satisfactionStatements.MS4rentingVideosDifficult === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'MS4rentingVideosDifficult', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Strongly agree</span>
            </div>

            {/* MS5 */}
            <label className="que block font-medium mt-14 mb-8">No matter what I do, I have the highest standards for myself.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Strongly disagree</span>
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`MS5highestStandards-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="MS5highestStandards"
                    value={value}
                    checked={surveyData.satisfactionStatements.MS5highestStandards === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'MS5highestStandards', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Strongly agree</span>
            </div>

            {/* MS6 */}
            <label className="que block font-medium mt-14 mb-8">I never settle for second best.</label>
            <div className="opt flex space-x-4 justify-center">
            <span style={{ marginRight: '0.5rem' }}>Strongly disagree</span>
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`MS6neverSettleSecondBest-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="MS6neverSettleSecondBest"
                    value={value}
                    checked={surveyData.satisfactionStatements.MS6neverSettleSecondBest === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'MS6neverSettleSecondBest', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}
                <span style={{ marginLeft: '1.5rem' }}>Strongly agree</span>
            </div>

            {/* MC1: Which of the following brands you find most innovative? */}
            <label className="que block font-medium mt-7 mb-8">Which of the following brands you find most innovative?</label>
            <div className="ans flex flex-col p-1">
              {['FrostByte', 'CoolNest', 'ChillCore', 'PolarPeak'].map((option) => {
                let className = '';
                switch (option) {
                  case 'FrostByte':
                    className = 'frostbyte';
                    break;
                  case 'CoolNest':
                    className = 'coolnest';
                    break;
                  case 'ChillCore':
                    className = 'chillcore';
                    break;
                  case 'PolarPeak':
                    className = 'polarpeak';
                    break;
                  default:
                    break;
                }
                return (
                  <label key={`MC1brandInnovative-${option}`} className='p-1'>
                    <input
                      type="radio"
                      name="MC1brandInnovative"
                      value={option}
                      checked={surveyData.demographics.MC1brandInnovative === option}
                      onChange={(e) => handleInputChange('demographics', 'MC1brandInnovative', e.target.value)}
                      className="radio-margin"
                    />
                    <span className={className}>{option}</span>
                  </label>
                );
              })}
            </div>

            </div>
          </div>
        );
      case 4:
        return(
          <div className="testform flex flex-col justify-center min-h-screen p-4 leading-relaxed" style={{ marginLeft: '4rem', marginRight: '4rem' }}>
            {/*Demographic Questions*/}

            {/* shifting MC1 to previous page */}

            {/* MC2: When did you see the information regarding FrostByte brand? */}
            <label className="que block font-medium mt-14 mb-8">When did you see the information page regarding <span className="frostbyte">FrostByte</span> brand?</label>
            <div className="ans flex flex-col p-1">
                {['Before shortlisting the fridges for comparison', 'After shortlisting the fridges for comparison', 'I did not see any information page regarding FrostByte brand'].map((option) => (
                <label key={`MC2frostByteInfoTime-${option}`} className='p-1'>
                    <input
                    type="radio"
                    name="MC2frostByteInfoTime"
                    value={option}
                    checked={surveyData.demographics.MC2frostByteInfoTime === option}
                    onChange={(e) => handleInputChange('demographics', 'MC2frostByteInfoTime', e.target.value)}
                    className="radio-margin"
                    />
                    {option}
                </label>
                ))}
            </div>

            {/* AC2: Read the question carefully */}
            <label className="que block font-medium mt-14 mb-8">
                Some studies show that over 50% of people don’t carefully read questions. If you are reading this question carefully, please select the box marked ‘other’ and type ‘Consumer Survey’ in the box below. Do not select “predictions of your own behavior.” Thank you for participating and taking the time to read through the questions carefully!
            </label>
            <div className="ans flex flex-col p-1">
                {['Predictions of your own behavior', 'Predictions of your friends\' behavior', 'Political preferences'].map((option) => (
                <label key={`AC2readCarefully-${option}`} className='p-1'>
                    <input
                    type="radio"
                    name="AC2readCarefully"
                    value={option}
                    checked={surveyData.demographics.AC2readCarefully === option}
                    onChange={(e) => handleInputChange('demographics', 'AC2readCarefully', e.target.value)}
                    className="radio-margin"
                    />
                    {option}
                </label>
                ))}
                <label className='p-1'>
                <input
                    type="radio"
                    name="AC2readCarefully"
                    value="Other"
                    checked={surveyData.demographics.AC2readCarefully === 'Other'}
                    onChange={(e) => handleInputChange('demographics', 'AC2readCarefully', e.target.value)}
                    className="radio-margin"
                />
                Other (please specify)
                {surveyData.demographics.AC2readCarefully === 'Other' && (
                    <input
                    type="text"
                    value={surveyData.demographics.AC2otherReadCarefully || ''}
                    onChange={(e) => handleInputChange('demographics', 'AC2otherReadCarefully', e.target.value)}
                    className="ml-2 border border-gray-300 rounded p-1"
                    placeholder="Type here"
                    />
                )}
                </label>
            </div>

            {/* Gender */}
            <label className="que block font-medium mt-14 mb-8">What is your gender?</label>
            <div className="ans flex flex-col p-1">
                {['Male', 'Female', 'Others/Prefer not to say'].map((option) => (
                <label key={`gender-${option}`} className='p-1'>
                    <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={surveyData.demographics.gender === option}
                    onChange={(e) => handleInputChange('demographics', 'gender', e.target.value)}
                    className="radio-margin"
                    />
                    {option}
                </label>
                ))}
            </div>

            {/* Age */}
            {/* <label className="que block font-medium mt-14 mb-8">What is your age?</label>
            <input
                type="number"
                min="0"
                value={surveyData.demographics.age}
                onChange={(e) => handleInputChange('demographics', 'age', e.target.value)}
                className="block m-1 p-1 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            /> */}
            {/* Age */}
            <label className="que block font-medium mt-14 mb-8">What is your age?</label>
            <input
            type="text"  // Changed from "number" to "text"
            value={surveyData.demographics.age}
            onChange={(e) => handleInputChange('demographics', 'age', e.target.value)}
            className="block m-1 p-1 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />


            {/* Fridge Purchase */}
            <label className="que block font-medium mt-14 mb-8">Have you ever been involved in a refrigerator purchase in the last 3 years?</label>
            <div className="ans flex flex-col p-1">
                {['Yes', 'No'].map((option) => (
                <label key={`fridgePurchase-${option}`}>
                    <input
                    type="radio"
                    name="fridgePurchase"
                    value={option}
                    checked={surveyData.demographics.fridgePurchase === option}
                    onChange={(e) => handleInputChange('demographics', 'fridgePurchase', e.target.value)}
                    className="radio-margin"
                    />
                    {option}
                </label>
                ))}
            </div>
            </div>
        );
      case 5:
        return(
          <div>
            {/* Comment on Study Textarea */}
            <label className="que block font-medium mb-3">Do you have any comments on our study? (Optional)</label>
            <textarea
              id="commentOnStudy"
              rows="4"
              value={surveyData.commentOnStudy}
              onChange={handleCommentChange}
              placeholder="Your comments here..."
              className='bg-gray-100 w-[100%] p-5'
            ></textarea>
          </div>
        );  
      default:
        return <div>Invalid Page</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mx-[10rem] my-[3rem]">
      {renderPageContent()}

      <div className="flex justify-end gap-5 mt-6">
        {/* {currentPage > 1 && (
          <button
            type="button"
            onClick={goToPreviousPage}
            className="flex items-center justify-center px-5 py-2 text-white rounded-lg bg-[#007AC0] hover:bg-[#007AC0]"
          >
            ←
          </button>
        )} */}

        {/* Show Next button only if it's not the last page */}
        {currentPage < totalPages && (
          <button
            type="button"
            onClick={goToNextPage}
            className="flex items-center justify-center px-5 py-2 text-white rounded-lg bg-[#007AC0] hover:bg-[#007AC0]"
          >
            →
          </button>
        )}

        {/* Show Submit button only on the last page */}
        {currentPage === totalPages && (
          <button
            type="submit"
            className="flex items-center justify-center px-5 py-2 text-white rounded-lg bg-[#007AC0] hover:bg-[#007AC0]"
          >
            →
          </button>
        )}
      </div>
    </form>
  );
};

export default TestForm;
