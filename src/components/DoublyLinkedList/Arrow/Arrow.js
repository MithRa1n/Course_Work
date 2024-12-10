import React from 'react';
import styles from './Arrow.module.css';

export const Arrow = ({ direction, isActive }) => {
    return (
        <div className={`${styles.arrow} ${styles[direction]} ${isActive ? styles.active : ''}`}>
            {direction === 'next' ? '→' : '←'}
        </div>
    );
}; 