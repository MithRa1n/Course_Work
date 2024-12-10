import React from 'react';
import "./AlgorithmInfo.css"
const AlgorithmInfo = ({ currentStep, algorithmSteps, nodes }) => {
    if (currentStep < 0 || !algorithmSteps[currentStep]) {
        return null;
    }

    const step = algorithmSteps[currentStep];

    return (
        <div className="algorithm-info">
            <div>
                <h3>Step {currentStep + 1}</h3>
                <p>{step.message}</p>
                <div className="distances">
                    <h4>Current distances:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Node</th>
                                <th>Known</th>
                                <th>Cost</th>
                                <th>Path</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nodes.map(node => {
                                const distance = step.distances[node.id];
                                const path = [];
                                let current = node.id;
                                while (current !== null && step.previous[current] !== undefined) {
                                    path.unshift(current);
                                    current = step.previous[current];
                                }
                                return (
                                    <tr key={node.id}>
                                        <td>{node.id}</td>
                                        <td>{step.visited.has(node.id) ? 'T' : 'F'}</td>
                                        <td>{distance === Infinity ? '∞' : distance}</td>
                                        <td>{path.length > 0 ? path.join(' → ') : '-'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmInfo; 