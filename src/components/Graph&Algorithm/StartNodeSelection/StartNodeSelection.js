import React from 'react';
import "./StartNodeSelection.css"

const StartNodeSelection = ({ nodes, startNode, onStartNodeChange, onStart }) => {
    const handleStart = () => {
        if (startNode) {
            onStart();
        }
    };

    return (
        <div className="node-selection-modal">
            <div className="modal-content">
                <h3>Select start node</h3>
                <select
                    value={startNode}
                    onChange={(e) => onStartNodeChange(e.target.value)}
                >
                    <option value="">Start node</option>
                    {nodes.map(node => (
                        <option key={node.id} value={node.id}>{node.id}</option>
                    ))}
                </select>
                <button
                    onClick={handleStart}
                    disabled={!startNode}
                    className="start-button"
                >
                    <span className="icon">▶</span> Start algorithm
                </button>
            </div>
        </div>
    );
};

export default StartNodeSelection;