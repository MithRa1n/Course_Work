import React from 'react';
import "./NodeSection.css"

const NodeSection = ({ nodes, onAddNode, onRemoveNode, isRunning }) => {
    return (
        <div className="node-section">
            <div className="section-header">
                <h3>Nodes</h3>
                <button className="add-button" onClick={onAddNode} disabled={isRunning}>
                    Add Node
                </button>
            </div>
            <div className="node-grid">
                {nodes.map(node => (
                    <div key={node.id} className="node-card">
                        <span className="node-info">{node.id}</span>
                        <button className="delete-button" onClick={() => onRemoveNode(node.id)} disabled={isRunning}>
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NodeSection; 