import React, { useState } from 'react';
import styles from './FilterToggle.module.css'; 
import upArrow from '../../assets/uparrow.png'; 
import downArrow from '../../assets/downarrow.png';

const FilterToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleVisibility = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <p>Filtros</p>

            <div className={`${styles.header} ${isOpen ? styles.expanded : ''}`} onClick={toggleVisibility}>
                Disponibilidad
                <img src={isOpen ? upArrow : downArrow} alt="Arrow" className={styles.arrow} />
            </div>
            {isOpen && (
                <div className={styles.content}>
                    <label>
                        <input type="checkbox" /> En existencia
                    </label>
                    <label>
                        <input type="checkbox" /> Agotado
                    </label>
                </div>
            )}
            






        </div>
    );
};

export default FilterToggle;
