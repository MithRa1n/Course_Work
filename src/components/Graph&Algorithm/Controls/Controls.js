import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Controls.css"

const Controls = ({ isRunning, isPaused, onStart, onStop, onPause, onResume, onStepBack }) => {
    const navigate = useNavigate();
    return (
        <div className="main-controls">
            <button onClick={() => navigate('/')} className="control-button home" >
                <span className="icon">🏠</span> Home</button>
            <button onClick={onStart} disabled={isRunning} className="control-button start" >
                <span className="icon">▶</span> Start</button>
            <button onClick={onStop} disabled={!isRunning} className="control-button stop">
                <span className="icon">■</span> Stop </button>
            {isRunning && !isPaused ? (
                <button onClick={onPause} className="control-button pause">
                    <span className="icon">❚❚</span> Pause </button>
            ) : isRunning && isPaused ? (
                <button onClick={onResume} className="control-button resume">
                    <span className="icon">▶</span> Continue </button>
            ) : null}
            {isRunning && (
                <button onClick={onStepBack} className="control-button back" >Step back </button>
            )}
        </div>
    );
};

export default Controls; 