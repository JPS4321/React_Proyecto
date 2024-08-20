import React, { useState } from 'react';
import styles from './FilterToggle.module.css'; 
import upArrow from '../../assets/uparrow.png'; 
import downArrow from '../../assets/downarrow.png';

const FilterToggle = ({ onAvailabilityChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inStock, setInStock] = useState(false);
    const [outOfStock, setOutOfStock] = useState(false);

    const toggleVisibility = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (name === 'inStock') {
            setInStock(checked);
            onAvailabilityChange(checked, outOfStock);
        } else if (name === 'outOfStock') {
            setOutOfStock(checked);
            onAvailabilityChange(inStock, checked);
        }
    };

    return (
        <div className={styles.container}>
            <p>Filtros</p>

            <div className={`${styles.header} ${isOpen ? styles.expanded : ''}`} onClick={toggleVisibility}>
                Disponibilidad
                <img src={downArrow} alt="Arrow" className={`${styles.arrow} ${isOpen ? styles.expanded : ''}`} />
            </div>
            <div className={`${styles.content} ${isOpen ? styles.expanded : ''}`}>
                <label>
                    <input 
                        type="checkbox" 
                        name="inStock"
                        checked={inStock}
                        onChange={handleCheckboxChange}
                    /> En existencia
                </label>
                <label>
                    <input 
                        type="checkbox" 
                        name="outOfStock"
                        checked={outOfStock}
                        onChange={handleCheckboxChange}
                    /> Agotado
                </label>
            </div>
        </div>
    );
};

export default FilterToggle;
