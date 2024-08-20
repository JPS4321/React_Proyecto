import React from 'react';
import './RangeSlider.css';

const RangeSlider = ({ minValue, maxValue, onMinChange, onMaxChange }) => {

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    onMinChange(value); 
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    onMaxChange(value); 
  };

  const minPercent = (minValue / 10000) * 100;
  const maxPercent = (maxValue / 10000) * 100;

  return (
    <div className="range-slider-container">
      <label className="price-range-title">Rango de Precios</label>

      <div className="range-input-container">
        <input
          type="number"
          className="range-input"
          value={minValue}
          onChange={handleMinChange}
          min="0"
          max="10000"
        />
        <span className="range-separator">Para</span>
        <input
          type="number"
          className="range-input"
          value={maxValue}
          onChange={handleMaxChange}
          min="0"
          max="10000"
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
          max="10000"
          value={minValue}
          onChange={handleMinChange}
        />
        <input
          type="range"
          className="slider"
          min="0"
          max="10000"
          value={maxValue}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
