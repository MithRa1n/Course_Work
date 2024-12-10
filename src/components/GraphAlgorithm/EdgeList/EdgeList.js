import React from 'react';
import "./EdgeList.css"

const EdgeList = ({ edges, nodes, isRunning, fromNode, toNode, weight, onFromNodeChange, onToNodeChange, onWeightChange, onAddEdge, onRemoveEdge }) => {
    return (
        <div className="edge-section">
            <div className="section-header">
                <h3>EdgeList</h3>
            </div>
            <div className="edge-list">
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Weight</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {edges.map((edge, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{edge.source}</td>
                                <td>{edge.target}</td>
                                <td>{edge.weight}</td>
                                <td>
                                    <button onClick={() => onRemoveEdge(index)} disabled={isRunning} className="delete-button">
                                        <span className="icon">×</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="edge-input">
                    <select value={fromNode} onChange={(e) => onFromNodeChange(e.target.value)} disabled={isRunning}>
                        <option value="">Start</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                    <select value={toNode} onChange={(e) => onToNodeChange(e.target.value)} disabled={isRunning}>
                        <option value="">End</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => onWeightChange(e.target.value)}
                        placeholder="Weight"
                        min="1"
                        disabled={isRunning} />
                    <button onClick={onAddEdge} disabled={isRunning || !fromNode || !toNode || !weight} className="add-button">
                        <span className="icon">+</span> Add edge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EdgeList; 