import React, { useState, useRef, useEffect, useCallback } from 'react';
import Graph from '../Graph/Graph';
import Controls from '../Controls/Controls';
import NodeSectiom from '../NodeSection/NodeSection';
import EdgeList from '../EdgeList/EdgeList';
import AlgorithmInfo from '../AlgorithmInfo/AlgorithmInfo';
import StartNodeSelection from '../StartNodeSelection/StartNodeSelection';
import { dijkstra, buildAllPaths } from '../Dijkstra/Dijkstra';
import './DijkstraGraphVisualition.css';

function DijkstraGraphVisualition() {
    const [nodes, setNodes] = useState([
        { "id": "0", "label": "Node 0" },
        { "id": "1", "label": "Node 1" },
        { "id": "2", "label": "Node 2" },
        { "id": "3", "label": "Node 3" },
        { "id": "4", "label": "Node 4" },
        { "id": "5", "label": "Node 5" },
        { "id": "6", "label": "Node 6" },
        { "id": "7", "label": "Node 7" }
    ]);

    const [edges, setEdges] = useState([
        { "source": "0", "target": "1", "weight": "10" },
        { "source": "0", "target": "2", "weight": "3" },
        { "source": "1", "target": "3", "weight": "2" },
        { "source": "2", "target": "1", "weight": "1" },
        { "source": "2", "target": "4", "weight": "8" },
        { "source": "3", "target": "5", "weight": "7" },
        { "source": "4", "target": "5", "weight": "2" },
        { "source": "5", "target": "6", "weight": "9" },
        { "source": "6", "target": "7", "weight": "4" }
    ]);

    const [fromNode, setFromNode] = useState('');
    const [toNode, setToNode] = useState('');
    const [weight, setWeight] = useState('');
    const [startNode, setStartNode] = useState('');
    const [currentPath, setCurrentPath] = useState([]);
    const [algorithmSteps, setAlgorithmSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(-1);
    const [showNodeSelection, setShowNodeSelection] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const intervalIdRef = useRef(null);

    const startAnimation = useCallback((startFromStep) => {
        if (!algorithmSteps.length) return;

        setCurrentStep(startFromStep);

        const step = algorithmSteps[startFromStep];
        if (step?.previous && step?.distances) {
            const allPaths = buildAllPaths(step.previous, startNode, step.distances);
            setCurrentPath(allPaths.map(p => p.path));
        }

        const id = setInterval(() => {
            setCurrentStep(prev => {
                const nextStep = prev + 1;
                if (nextStep >= algorithmSteps.length) {
                    clearInterval(id);
                    setIsRunning(false);
                    setIsPaused(false);
                    return prev;
                }

                const step = algorithmSteps[nextStep];
                if (step?.previous && step?.distances) {
                    const allPaths = buildAllPaths(step.previous, startNode, step.distances);
                    setCurrentPath(allPaths.map(p => p.path));
                }
                return nextStep;
            });
        }, 2000);

        intervalIdRef.current = id;
    }, [algorithmSteps, startNode]);

    useEffect(() => {
        if (isRunning && algorithmSteps.length > 0) {
            startAnimation(0);
        }
    }, [algorithmSteps, isRunning, startAnimation]);

    const handleAddNode = () => {
        if (nodes.length >= 15 || isRunning) return;
        setCurrentPath([]);

        const existingIds = new Set(nodes.map(node => node.id));
        let newId = 0;
        while (existingIds.has(newId.toString())) {
            newId++;
        }

        const newNode = {
            id: newId.toString(),
            label: `Node ${newId}`
        };

        setNodes(prev => [...prev, newNode]);
    };

    const handleRemoveNode = (nodeId) => {
        if (isRunning) return;
        setCurrentPath([]);
        setEdges(prev => prev.filter(edge =>
            edge.source !== nodeId && edge.target !== nodeId
        ));
        setNodes(prev => prev.filter(node => node.id !== nodeId));
    };

    const handleAddEdge = () => {
        if (fromNode && toNode && weight) {
            setCurrentPath([]);

            if (Number(weight) <= 0) {
                alert('The weight of the edge must be a positive number!');
                return;
            }

            const edgeExists = edges.some(edge =>
                (edge.source === fromNode && edge.target === toNode) ||
                (edge.source === toNode && edge.target === fromNode)
            );

            if (edgeExists) {
                alert('The connection between these vertices already exists!');
                return;
            }

            setEdges(prev => [...prev, { source: fromNode, target: toNode, weight }]);
            setFromNode('');
            setToNode('');
            setWeight('');
        }
    };

    const handleRemoveEdge = (index) => {
        setCurrentPath([]);
        setEdges(prev => prev.filter((_, i) => i !== index));
    };

    const handleStart = () => {
        setShowNodeSelection(true);
    };

    const handleStartAlgorithm = () => {
        if (!startNode) return;

        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }

        setShowNodeSelection(false);
        setIsRunning(true);
        setIsPaused(false);
        setCurrentStep(-1);
        setCurrentPath([]);

        const { steps } = dijkstra(nodes, edges, startNode);
        setAlgorithmSteps(steps);
    };

    const handleStop = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }
        setIsRunning(false);
        setCurrentStep(-1);
    };

    const handlePause = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false);
        startAnimation(currentStep + 1);
    };

    const handleStepBack = () => {
        if (currentStep > 0) {
            const newStep = currentStep - 1;
            setCurrentStep(newStep);

            const step = algorithmSteps[newStep];
            if (step?.previous && step?.distances) {
                const allPaths = buildAllPaths(step.previous, startNode, step.distances);
                setCurrentPath(allPaths.map(p => p.path));
            }
        }
    };

    return (
        <div className="graph-container">
            <div className="visualization-container">
                <div className="graph-visualization">
                    {!nodes || nodes.length === 0 ? (
                        <div>There are no vertices to display</div>
                    ) : (
                        <Graph
                            nodes={nodes}
                            edges={edges}
                            currentPath={currentPath}
                            isRunning={isRunning}
                            algorithmSteps={algorithmSteps}
                            currentStep={currentStep} />
                    )}
                </div>

                {algorithmSteps.length > 0 && currentStep >= 0 && (
                    <AlgorithmInfo
                        currentStep={currentStep}
                        algorithmSteps={algorithmSteps}
                        nodes={nodes} />
                )}
            </div>

            <div className="controls-section">
                <Controls
                    isRunning={isRunning}
                    currentStep={currentStep}
                    onStart={handleStart}
                    onStop={handleStop}
                    onStepBack={handleStepBack}
                    isPaused={isPaused}
                    onPause={handlePause}
                    onResume={handleResume} />

                <div className="graph-management">
                    <NodeSectiom
                        nodes={nodes}
                        edges={edges}
                        isRunning={isRunning}
                        onAddNode={handleAddNode}
                        onRemoveNode={handleRemoveNode} />
                    <EdgeList
                        edges={edges}
                        nodes={nodes}
                        isRunning={isRunning}
                        fromNode={fromNode}
                        toNode={toNode}
                        weight={weight}
                        onFromNodeChange={setFromNode}
                        onToNodeChange={setToNode}
                        onWeightChange={setWeight}
                        onAddEdge={handleAddEdge}
                        onRemoveEdge={handleRemoveEdge} />
                </div>
            </div>

            {showNodeSelection && (
                <StartNodeSelection
                    nodes={nodes}
                    startNode={startNode}
                    onStartNodeChange={setStartNode}
                    onStart={handleStartAlgorithm} />
            )}
        </div>
    );
}

export default DijkstraGraphVisualition;