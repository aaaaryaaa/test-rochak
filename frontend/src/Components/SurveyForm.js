import React, { useState } from 'react';
import axios from 'axios';
import BaseUrl from '../BaseUrl';
import { useNavigate } from 'react-router-dom';

const SurveyForm = () => {
    const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState({
    pageA: {
        expertise: null,
        knowledge: null,
        commitmentUS: null,
        commitmentCategory: null,
        investmentCategory: null,
    },
    specificEvents: {
      unableToGetWhatYouWant: null,
      crossTheLine: null,
      accomplishmentsPsyched: null,
      getOnParentsNerves: null,
      obeyRules: null,
      readCarefully: null,
      actObjectionable: null,
      doWellAtThings: null,
      notCarefulTrouble: null,
      underperformingGoals: null,
      progressTowardSuccess: null,
      fewHobbiesInterest: null,
    },
    satisfactionStatements: {
      carRadioCheckStations: null,
      lookoutBetterJobs: null,
      shopForGift: null,
      rentingVideosDifficult: null,
      highestStandards: null,
      neverSettleSecondBest: null,
    },
    demographics: {
      age: '',
      gender: '',
      ethnicBackground: '',
      englishProficiency: null,
      fridgePurchase: '',
    },
  });

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

  const validateForm = () => {
    // Check required fields in pageA
    const pageAFields = ['expertise', 'knowledge']; // Add other required fields if necessary
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

    // Check demographics (if needed)
    const demographicFields = ['age', 'gender', 'ethnicBackground', 'englishProficiency', 'fridgePurchase'];
    for (let field of demographicFields) {
      if (!surveyData.demographics[field]) {
        return false; // Field is empty
      }
    }

    return true; // All fields are filled
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) {
        alert('Please fill in all the details before submitting.');
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
      console.log(response);
      navigate("/restofsurvey")
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Please respond to the following questions by selecting the appropriate option on a scale from 1 (none at all) to 5 (a great deal).</h2>
        <div>
            {/* Expertise in product category */}
            <label className="block font-medium mb-2">(Ex1) How much expertise do you think Frostbyte has in product category?</label>
            <div className="flex space-x-4">none at all |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`expertise-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="expertise"
                    value={value}
                    checked={surveyData.pageA.expertise === value}
                    onChange={(e) => handleInputChange('pageA', 'expertise', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| a great deal
            </div>

            {/* Knowledge regarding the product category */}
            <label className="block font-medium mb-2">(Ex2) How much knowledge Frostbyte has regarding the product category?</label>
            <div className="flex space-x-4">none at all |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`knowledge-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="knowledge"
                    value={value}
                    checked={surveyData.pageA.knowledge === value}
                    onChange={(e) => handleInputChange('pageA', 'knowledge', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| a great deal
            </div>

            {/* Commitment to success in the U.S. refrigerators market */}
            <label className="block font-medium mb-2">(Ex3) How committed do you think Frostbyte is to success in the U.S. refrigerators market?</label>
            <div className="flex space-x-4">none at all |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`commitmentUS-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="commitmentUS"
                    value={value}
                    checked={surveyData.pageA.commitmentUS === value}
                    onChange={(e) => handleInputChange('pageA', 'commitmentUS', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| a great deal
            </div>

            {/* Commitment to the product category */}
            <label className="block font-medium mb-2">(Ex4) How committed do you think Frostbyte is to the product category?</label>
            <div className="flex space-x-4">none at all |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`commitmentCategory-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="commitmentCategory"
                    value={value}
                    checked={surveyData.pageA.commitmentCategory === value}
                    onChange={(e) => handleInputChange('pageA', 'commitmentCategory', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| a great deal
            </div>

            {/* Investment in the product category */}
            <label className="block font-medium mb-2">(Ex5) How invested do you think Frostbyte is in the product category?</label>
            <div className="flex space-x-4">none at all |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`investmentCategory-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="investmentCategory"
                    value={value}
                    checked={surveyData.pageA.investmentCategory === value}
                    onChange={(e) => handleInputChange('pageA', 'investmentCategory', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| a great deal
            </div>
            </div>

        
            <h2 className="text-xl font-bold mb-4">This set of questions asks you about specific events in your life. Please indicate your answer to each question by selecting the appropriate option.</h2>
            <div>
            {/* RFQ1 */}
            <label className="block font-medium mb-2">(RFQ1) Compared to most people, are you typically unable to get what you want out of life?</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`unableToGetWhatYouWant-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="unableToGetWhatYouWant"
                    value={value}
                    checked={surveyData.specificEvents.unableToGetWhatYouWant === value}
                    onChange={(e) => handleInputChange('specificEvents', 'unableToGetWhatYouWant', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| very often
            </div>

            {/* RFQ2 */}
            <label className="block font-medium mb-2">(RFQ2) Growing up, would you ever “cross the line” by doing things that your parents would not tolerate?</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`crossTheLine-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="crossTheLine"
                    value={value}
                    checked={surveyData.specificEvents.crossTheLine === value}
                    onChange={(e) => handleInputChange('specificEvents', 'crossTheLine', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| very often
            </div>

            {/* RFQ3 */}
            <label className="block font-medium mb-2">(RFQ3) How often have you accomplished things that got you "psyched" to work even harder?</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`accomplishmentsPsyched-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="accomplishmentsPsyched"
                    value={value}
                    checked={surveyData.specificEvents.accomplishmentsPsyched === value}
                    onChange={(e) => handleInputChange('specificEvents', 'accomplishmentsPsyched', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| many times
            </div>

            {/* RFQ4 */}
            <label className="block font-medium mb-2">(RFQ4) Did you get on your parents’ nerves often when you were growing up?</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`getOnParentsNerves-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="getOnParentsNerves"
                    value={value}
                    checked={surveyData.specificEvents.getOnParentsNerves === value}
                    onChange={(e) => handleInputChange('specificEvents', 'getOnParentsNerves', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| very often
            </div>

            {/* RFQ5 */}
            <label className="block font-medium mb-2">(RFQ5) How often did you obey rules and regulations that were established by your parents?</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`obeyRules-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="obeyRules"
                    value={value}
                    checked={surveyData.specificEvents.obeyRules === value}
                    onChange={(e) => handleInputChange('specificEvents', 'obeyRules', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| always
            </div>

            {/* AC */}
            <label className="block font-medium mb-2">(AC) Research shows that over 50% of people don't read questions carefully. If you are reading this question carefully, please select the fourth option from the left.</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`readCarefully-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="readCarefully"
                    value={value}
                    checked={surveyData.specificEvents.readCarefully === value}
                    onChange={(e) => handleInputChange('specificEvents', 'readCarefully', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| always
            </div>

            {/* RFQ6 */}
            <label className="block font-medium mb-2">(RFQ6) Growing up, did you ever act in ways that your parents thought were objectionable?</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`actObjectionable-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="actObjectionable"
                    value={value}
                    checked={surveyData.specificEvents.actObjectionable === value}
                    onChange={(e) => handleInputChange('specificEvents', 'actObjectionable', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| very often
            </div>

            {/* RFQ7 */}
            <label className="block font-medium mb-2">(RFQ7) Do you often do well at different things that you try?</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`doWellAtThings-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="doWellAtThings"
                    value={value}
                    checked={surveyData.specificEvents.doWellAtThings === value}
                    onChange={(e) => handleInputChange('specificEvents', 'doWellAtThings', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| very often
            </div>

            {/* RFQ8 */}
            <label className="block font-medium mb-2">(RFQ8) Not being careful enough has gotten me into trouble at times.</label>
            <div className="flex space-x-4">never or seldom |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`notCarefulTrouble-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="notCarefulTrouble"
                    value={value}
                    checked={surveyData.specificEvents.notCarefulTrouble === value}
                    onChange={(e) => handleInputChange('specificEvents', 'notCarefulTrouble', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| very often
            </div>

            {/* RFQ9 */}
            <label className="block font-medium mb-2">(RFQ9) When it comes to achieving things that are important to me, I find that I don't perform as well as I ideally would like to do.</label>
            <div className="flex space-x-4">never true |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`underperformingGoals-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="underperformingGoals"
                    value={value}
                    checked={surveyData.specificEvents.underperformingGoals === value}
                    onChange={(e) => handleInputChange('specificEvents', 'underperformingGoals', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| very often true
            </div>

            {/* RFQ10 */}
            <label className="block font-medium mb-2">(RFQ10) I feel like I have made progress toward being successful in my life.</label>
            <div className="flex space-x-4">certainly false |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`progressTowardSuccess-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="progressTowardSuccess"
                    value={value}
                    checked={surveyData.specificEvents.progressTowardSuccess === value}
                    onChange={(e) => handleInputChange('specificEvents', 'progressTowardSuccess', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| certainly true
            </div>

            {/* RFQ11 */}
            <label className="block font-medium mb-2">(RFQ11) I have found very few hobbies or activities in my life that capture my interest or motivate me to put effort into them.</label>
            <div className="flex space-x-4">certainly false |
                {[1, 2, 3, 4, 5].map((value) => (
                <label key={`fewHobbiesInterest-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="fewHobbiesInterest"
                    value={value}
                    checked={surveyData.specificEvents.fewHobbiesInterest === value}
                    onChange={(e) => handleInputChange('specificEvents', 'fewHobbiesInterest', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| certainly true
            </div>
            </div>


            <h2 className="text-xl font-bold mb-4">Please respond to the following statements by selecting the appropriate option on a scale from 1 (strongly disagree) to 7 (strongly agree).</h2>
            <div>
            {/* MS1 */}
            <label className="block font-medium mb-2">(MS1) When I am in the car listening to the radio, I often check other stations to see if something better is playing, even if I’m relatively satisfied with what I’m listening to.</label>
            <div className="flex space-x-4">Strongly disagree |
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`carRadioCheckStations-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="carRadioCheckStations"
                    value={value}
                    checked={surveyData.satisfactionStatements.carRadioCheckStations === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'carRadioCheckStations', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| Strongly agree
            </div>

            {/* MS2 */}
            <label className="block font-medium mb-2">(MS2) No matter how satisfied I am with my job, it’s only right for me to be on the lookout for better opportunities.</label>
            <div className="flex space-x-4">Strongly disagree |
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`lookoutBetterJobs-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="lookoutBetterJobs"
                    value={value}
                    checked={surveyData.satisfactionStatements.lookoutBetterJobs === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'lookoutBetterJobs', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| Strongly agree
            </div>

            {/* MS3 */}
            <label className="block font-medium mb-2">(MS3) I often find it difficult to shop for a gift for a friend.</label>
            <div className="flex space-x-4">Strongly disagree |
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`shopForGift-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="shopForGift"
                    value={value}
                    checked={surveyData.satisfactionStatements.shopForGift === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'shopForGift', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| Strongly agree
            </div>

            {/* MS4 */}
            <label className="block font-medium mb-2">(MS4) Renting videos is really difficult. I’m always struggling to pick the best one.</label>
            <div className="flex space-x-4">Strongly disagree |
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`rentingVideosDifficult-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="rentingVideosDifficult"
                    value={value}
                    checked={surveyData.satisfactionStatements.rentingVideosDifficult === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'rentingVideosDifficult', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| Strongly agree
            </div>

            {/* MS5 */}
            <label className="block font-medium mb-2">(MS5) No matter what I do, I have the highest standards for myself.</label>
            <div className="flex space-x-4">Strongly disagree |
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`highestStandards-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="highestStandards"
                    value={value}
                    checked={surveyData.satisfactionStatements.highestStandards === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'highestStandards', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| Strongly agree
            </div>

            {/* MS6 */}
            <label className="block font-medium mb-2">(MS6) I never settle for second best.</label>
            <div className="flex space-x-4">Strongly disagree |
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`neverSettleSecondBest-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="neverSettleSecondBest"
                    value={value}
                    checked={surveyData.satisfactionStatements.neverSettleSecondBest === value}
                    onChange={(e) => handleInputChange('satisfactionStatements', 'neverSettleSecondBest', parseInt(e.target.value))}
                    />
                    {/* {value} */}
                </label>
                ))}| Strongly agree
            </div>
            </div>


            <h2 className="text-xl font-bold mb-4">Demographic Questions</h2>
            <div>
            {/* Gender */}
            <label className="block font-medium mb-2">What is your gender?</label>
            <div className="flex flex-col p-1">
                {['Male', 'Female', 'Others/Prefer not to say'].map((option) => (
                <label key={`gender-${option}`} className='p-1'>
                    <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={surveyData.demographics.gender === option}
                    onChange={(e) => handleInputChange('demographics', 'gender', e.target.value)}
                    />
                    {option}
                </label>
                ))}
            </div>

            {/* Age */}
            <label className="block font-medium mb-2">What is your age?</label>
            <input
                type="number"
                min="0"
                value={surveyData.demographics.age}
                onChange={(e) => handleInputChange('demographics', 'age', e.target.value)}
                className="block m-1 p-1 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Ethnic Background */}
            <label className="block font-medium mb-2">What is your ethnic background?</label>
            <div className="flex flex-col p-1">
                {[
                'White / Caucasian',
                'Asian - Eastern',
                'Asian - Indian',
                'Hispanic',
                'African-American',
                'Native-American',
                'Mixed race',
                'Other',
                ].map((option) => (
                <label key={`ethnicBackground-${option}`} className='p-1'>
                    <input
                    type="radio"
                    name="ethnicBackground"
                    value={option}
                    checked={surveyData.demographics.ethnicBackground === option}
                    onChange={(e) => handleInputChange('demographics', 'ethnicBackground', e.target.value)}
                    />
                    {option}
                </label>
                ))}
            </div>

            {/* English Proficiency */}
            <label className="block font-medium mb-2">Rate your English language proficiency (1 = Extremely low, 7 = Extremely high)</label>
            <div className="flex space-x-4 p-1">
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={`englishProficiency-${value}`} className='p-1'>
                    <input
                    type="radio"
                    name="englishProficiency"
                    value={value}
                    checked={surveyData.demographics.englishProficiency === value}
                    onChange={(e) => handleInputChange('demographics', 'englishProficiency', parseInt(e.target.value))}
                    />
                    {value}
                </label>
                ))}
            </div>

            {/* Fridge Purchase */}
            <label className="block font-medium mb-2">Have you ever been involved in a refrigerator purchase in the last 3 years?</label>
            <div className="flex flex-col p-1">
                {['Yes', 'No'].map((option) => (
                <label key={`fridgePurchase-${option}`}>
                    <input
                    type="radio"
                    name="fridgePurchase"
                    value={option}
                    checked={surveyData.demographics.fridgePurchase === option}
                    onChange={(e) => handleInputChange('demographics', 'fridgePurchase', e.target.value)}
                    />
                    {option}
                </label>
                ))}
            </div>
            </div>


        <button type="submit" className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200">
            Submit
        </button>
        </form>
    </div>
  );
};

export default SurveyForm;