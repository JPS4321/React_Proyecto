import React, { useState } from 'react';
import './RangeSlider.css';

const RangeSlider = ({ minValue, maxValue, onMinChange, onMaxChange }) => {
  const [tempMinValue, setTempMinValue] = useState(minValue);
  const [tempMaxValue, setTempMaxValue] = useState(maxValue);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), tempMaxValue - 1);
    setTempMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), tempMinValue + 1);
    setTempMaxValue(value);
  };

  const handleMinChangeEnd = () => {
    onMinChange(tempMinValue); 
  };

  const handleMaxChangeEnd = () => {
    onMaxChange(tempMaxValue); 
  };

  const minPercent = (tempMinValue / 1000) * 100;
  const maxPercent = (tempMaxValue / 1000) * 100;

  return (
    <div className="range-slider-container">
      <label className="price-range-title">Rango de Precios</label>

      <div className="range-input-container">
        <input
          type="number"
          className="range-input"
          value={tempMinValue}
          onChange={handleMinChange}
          min="0"
          max="1000"
        />
        <span className="range-separator">Para</span>
        <input
          type="number"
          className="range-input"
          value={tempMaxValue}
          onChange={handleMaxChange}
          min="0"
          max="1000"
        />
      </div>
      <div className="slider-container">
        <div className="slider-background"></div>
        <div
          className="slider-track"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>
        <input
          type="range"
          className="slider"
          min="0"
          max="1000"
          value={tempMinValue}
          onChange={handleMinChange}
          onMouseUp={handleMinChangeEnd} 
          onTouchEnd={handleMinChangeEnd} 
        />
        <input
          type="range"
          className="slider"
          min="0"
          max="1000"
          value={tempMaxValue}
          onChange={handleMaxChange}
          onMouseUp={handleMaxChangeEnd} 
          onTouchEnd={handleMaxChangeEnd} 
        />
      </div>
    </div>
  );
};

export default RangeSlider;
