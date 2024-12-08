import React from 'react';
import styles from './Node.module.css';

export const Node = ({ value, onDelete, isHighlighted, isTraversing, isActive }) => {
    return (
        <div className={`${styles.node} ${isHighlighted ? styles.highlighted : ''} ${isTraversing ? styles.traversing : ''} ${isActive ? styles.active : ''}`}>
            <div className={styles.nodeContent}>
                <div className={styles.valueContainer}>
                    <div className={styles.value}>{value}</div>
                    <button className={styles.deleteButton} onClick={onDelete}>
                        ×
                    </button>
                </div>
                <div className={styles.pointers}>
                    <div className={styles.pointer}>prev</div>
                    <div className={styles.pointer}>next</div>
                </div>
            </div>
        </div>
    );
};