import React, { useState } from 'react';
import styles from './FilterToggle.module.css'; // Asegúrate de que la importación es correcta

const FilterToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleVisibility = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.header} ${isOpen ? styles.expanded : ''}`} onClick={toggleVisibility}>
                Disponibilidad
                <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
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
