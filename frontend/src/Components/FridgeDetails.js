// components/FridgeDetails.js
import React from 'react';

const FridgeDetails = ({ fridge }) => {
    return (
        <div className="fixed bottom-10 fridge-card p-4 border rounded-lg shadow-md mb-4 flex justify-around w-[full] h-[full]">
            <img src={fridge.fridgeImage} alt="Fridge" className="m-4 h-[18rem]" />
            <div>
                <p className='text-lg font-bold'>{fridge.name.toUpperCase()}</p>
                <img src={fridge.reviewImage} alt="Review" className="h-[2rem]" />
                <p className="font-bold text-lg">${fridge.price}</p>
                <p className='text-[0.8rem]'>Dimensions: {fridge.dimensions.height} x {fridge.dimensions.width} x {fridge.dimensions.depth} inches</p>
                <p className='text-[0.8rem]'>Cooling Space: {fridge.coolingSpace} Cu. Ft.</p>
                <p className='text-[0.8rem]'>Freezer Space: {fridge.freezerSpace} Cu. Ft.</p>
                <p className='text-[0.8rem]'>Total Space: {fridge.totalSpace} Cu. Ft.</p>
                <p className='text-[0.8rem]'>Product Weight: {fridge.productWeight} lb.</p>
                <p className='text-[0.8rem]'>Energy Consumption: {fridge.energyConsumption} kWh/year</p>
                <p className='text-[0.8rem]'>Ice Maker: {fridge.iceMaker ? 'Yes' : 'No'}</p>
                <p className='text-[0.8rem]'>Garage Ready: {fridge.garageReady ? 'Yes' : 'No'}</p>
                <p className='text-[0.8rem]'>Internal Water Dispenser: {fridge.internalWaterDispenser ? 'Yes' : 'No'}</p>
                <p className='text-[0.8rem]'>Warranty: {fridge.warranty}</p>
            </div>
        </div>
    );
};

export default FridgeDetails;
