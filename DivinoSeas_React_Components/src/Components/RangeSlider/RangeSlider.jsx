import React, { useState, useEffect } from 'react';
import './RangeSlider.css';

const RangeSlider = ({ minValue, maxValue, onMinChange, onMaxChange }) => {
  
  const [tempMinValue, setTempMinValue] = useState(minValue);
  const [tempMaxValue, setTempMaxValue] = useState(maxValue);
  const [inputMin, setInputMin] = useState(minValue.toString());
  const [inputMax, setInputMax] = useState(maxValue.toString());

  
  useEffect(() => {
    setTempMinValue(minValue);
    setTempMaxValue(maxValue);
    setInputMin(minValue.toString());
    setInputMax(maxValue.toString());
  }, [minValue, maxValue]);

  
  const handleMinInputChange = (e) => {
    setInputMin(e.target.value);
  };

  
  const handleMaxInputChange = (e) => {
    setInputMax(e.target.value);
  };

  
  const handleMinChangeEnd = (e) => {
    if (e.key === 'Enter') {
      let value = Number(inputMin) || 0;
      if (value >= tempMaxValue) {
        value = tempMaxValue - 1;
      }
      setTempMinValue(value);
      setInputMin(value.toString());
      onMinChange(value); 
    }
  };

  
  const handleMaxChangeEnd = (e) => {
    if (e.key === 'Enter') {
      let value = Number(inputMax) || 0;
      if (value <= tempMinValue) {
        value = tempMinValue + 1;
      }
      setTempMaxValue(value);
      setInputMax(value.toString());
      onMaxChange(value); 
    }
  };

  
  const handleMinSliderChange = (e) => {
    const value = Math.min(Number(e.target.value), tempMaxValue - 1);
    setTempMinValue(value);
    setInputMin(value.toString());
  };

  
  const handleMaxSliderChange = (e) => {
    const value = Math.max(Number(e.target.value), tempMinValue + 1);
    setTempMaxValue(value);
    setInputMax(value.toString());
  };

  
  const handleMinMouseUp = () => {
    onMinChange(tempMinValue);
  };

  
  const handleMaxMouseUp = () => {
    onMaxChange(tempMaxValue);
  };

  
  const minPercent = (tempMinValue / 1000) * 100;
  const maxPercent = (tempMaxValue / 1000) * 100;

  return (
    <div className="range-slider-container">
      <label className="price-range-title">Rango de Precios</label>

      <div className="range-input-container">
        <input
          type="text"
          className="range-input"
          value={inputMin}
          onChange={handleMinInputChange}
          onKeyDown={handleMinChangeEnd}
          placeholder="Mín"
        />
        <span className="range-separator">Para</span>
        <input
          type="text"
          className="range-input"
          value={inputMax}
          onChange={handleMaxInputChange}
          onKeyDown={handleMaxChangeEnd}
          placeholder="Máx"
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
          onChange={handleMinSliderChange}
          onMouseUp={handleMinMouseUp} 
        />
        <input
          type="range"
          className="slider"
          min="0"
          max="1000"
          value={tempMaxValue}
          onChange={handleMaxSliderChange}
          onMouseUp={handleMaxMouseUp} 
        />
      </div>
    </div>
  );
};

export default RangeSlider;
