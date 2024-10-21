// components/FridgeDetails.js
import React from 'react';

const FridgeDetails = ({ fridge }) => {
    return (
        <div className="fridge-card p-4 border rounded-lg shadow-md mb-4 flex justify-around w-[40rem] h-[22rem]">
            <img src={fridge.fridgeImage} alt="Fridge" className="m-4" />
            <div>
                <p className='text-lg font-bold'>{fridge.name.toUpperCase()}</p>
                <img src={fridge.reviewImage} alt="Review" className="h-[2rem]" />
                <p className="fridge-price">${fridge.price}</p>
                <h3 className="text-md font-bold mb-2">Dimensions: {fridge.dimensions.height} x {fridge.dimensions.width} x {fridge.dimensions.depth} inches</h3>
                <p>Cooling Space: {fridge.coolingSpace} Cu. Ft.</p>
                <p>Freezer Space: {fridge.freezerSpace} Cu. Ft.</p>
                <p>Total Space: {fridge.totalSpace} Cu. Ft.</p>
                <p>Product Weight: {fridge.productWeight} lb.</p>
                <p>Energy Consumption: {fridge.energyConsumption} kWh/year</p>
                <p>Ice Maker: {fridge.iceMaker ? 'Yes' : 'No'}</p>
                <p>Garage Ready: {fridge.garageReady ? 'Yes' : 'No'}</p>
                <p>Internal Water Dispenser: {fridge.internalWaterDispenser ? 'Yes' : 'No'}</p>
                <p>Warranty: {fridge.warranty}</p>
            </div>
        </div>
    );
};

export default FridgeDetails;
