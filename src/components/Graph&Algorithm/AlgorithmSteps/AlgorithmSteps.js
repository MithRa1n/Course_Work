import React from 'react';
import "./AlgorithmSteps.css"
const AlgorithmSteps = ({ steps, currentStep }) => {
    return (
        <div className="algorithm-steps">
            <h3>Steps of dijkstra algorithm:</h3>
            <div className="steps-container">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`step ${index === currentStep ? 'current' : ''} 
                                  ${index < currentStep ? 'completed' : ''}`}>
                        <div className="step-number">{index + 1}</div>
                        <div className="step-content">
                            <p>{step.description}</p>
                            {step.distances && (
                                <div className="distances">
                                    <strong>Distances:</strong>
                                    {Object.entries(step.distances).map(([node, distance]) => (
                                        <span key={node}>
                                            {node}: {distance === Infinity ? '∞' : distance}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlgorithmSteps; 