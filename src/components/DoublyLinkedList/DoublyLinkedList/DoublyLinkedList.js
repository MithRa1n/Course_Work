import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Node } from '../Node/Node';
import { Arrow } from '../Arrow/Arrow';
import styles from './DoublyLinkedList.module.css';

export const DoublyLinkedList = () => {
    const navigate = useNavigate();
    const [nodes, setNodes] = useState([1, 2, 3, 4]);
    const [newValue, setNewValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [currentTraversal, setCurrentTraversal] = useState(-1);
    const [isTraversing, setIsTraversing] = useState(false);
    const [searchDirection, setSearchDirection] = useState('start');
    const [deleteMode, setDeleteMode] = useState('first');
    const [activeLinks, setActiveLinks] = useState({ prev: -1, next: -1 });
    const animateLinks = async (fromIndex, toIndex, type = 'next') => {
        setActiveLinks({ prev: type === 'prev' ? toIndex : -1, next: type === 'next' ? fromIndex : -1 });
        await new Promise(resolve => setTimeout(resolve, 500));
        setActiveLinks({ prev: -1, next: -1 });
    };

    const addNode = async () => {
        if (newValue.trim() !== '' && !isTraversing) {
            try {
                setIsTraversing(true);
                const newNodeValue = parseInt(newValue);
                const tailIndex = nodes.length - 1;
                setCurrentTraversal(tailIndex);
                await new Promise(resolve => setTimeout(resolve, 500));
                await animateLinks(tailIndex, nodes.length, 'next');
                await animateLinks(nodes.length, tailIndex, 'prev');
                setNodes(prev => [...prev, newNodeValue]);
                setNewValue('');
                setCurrentTraversal(nodes.length);
                await new Promise(resolve => setTimeout(resolve, 500));
            } finally {
                setCurrentTraversal(-1);
                setIsTraversing(false);
            }
        }
    };

    const addNodeToStart = async () => {
        if (newValue.trim() !== '' && !isTraversing) {
            try {
                setIsTraversing(true);
                const newNodeValue = parseInt(newValue);
                setCurrentTraversal(0);
                await new Promise(resolve => setTimeout(resolve, 500));
                await animateLinks(0, -1, 'next');
                await animateLinks(-1, 0, 'prev');
                setNodes([newNodeValue, ...nodes]);
                setNewValue('');
            } finally {
                setCurrentTraversal(-1);
                setIsTraversing(false);
            }
        }
    };

    const deleteNode = async (index) => {
        if (!isTraversing) {
            setIsTraversing(true);

            try {
                setCurrentTraversal(index);
                await new Promise(resolve => setTimeout(resolve, 500));
                if (index === 0) {
                    if (nodes.length > 1) {
                        await animateLinks(0, 1, 'prev');
                        await new Promise(resolve => setTimeout(resolve, 500));
                        setCurrentTraversal(1);
                        await animateLinks(1, -1, 'prev');
                    }
                } else if (index === nodes.length - 1) {
                    await animateLinks(index - 1, index, 'next');
                    await new Promise(resolve => setTimeout(resolve, 500));
                    setCurrentTraversal(index - 1);
                    await animateLinks(index - 1, -1, 'next');
                } else {

                    await animateLinks(index - 1, index, 'next');
                    await new Promise(resolve => setTimeout(resolve, 500));
                    await animateLinks(index - 1, index + 1, 'next');
                    await animateLinks(index + 1, index, 'prev');
                    await new Promise(resolve => setTimeout(resolve, 500));
                    await animateLinks(index + 1, index - 1, 'prev');
                }

                setHighlightedIndex(index);
                await new Promise(resolve => setTimeout(resolve, 500));
                setNodes(prevNodes => prevNodes.filter((_, i) => i !== index));

                await new Promise(resolve => setTimeout(resolve, 500));
            } finally {
                setHighlightedIndex(-1);
                setCurrentTraversal(-1);
                setIsTraversing(false);
            }
        }
    };

    const deleteByValue = async (value) => {
        if (!isTraversing) {
            setIsTraversing(true);
            try {
                let nodesToDelete = [];
                if (searchDirection === 'start') {
                    for (let i = 0; i < nodes.length; i++) {
                        setCurrentTraversal(i);
                        await new Promise(resolve => setTimeout(resolve, 500));
                        if (nodes[i] === value) {
                            nodesToDelete.push(i);
                            if (deleteMode === 'first') break;
                        }
                    }
                } else {
                    for (let i = nodes.length - 1; i >= 0; i--) {
                        setCurrentTraversal(i);
                        await new Promise(resolve => setTimeout(resolve, 500));
                        if (nodes[i] === value) {
                            nodesToDelete.push(i);
                            if (deleteMode === 'first') break;
                        }
                    }
                }


                nodesToDelete.sort((a, b) => b - a);

                for (const index of nodesToDelete) {
                    await deleteNode(index);
                    await new Promise(resolve => setTimeout(resolve, 500));
                }

            } finally {
                setCurrentTraversal(-1);
                setSearchValue('');
                setIsTraversing(false);
            }
        }
    };

    const searchNode = async () => {
        if (!isTraversing) {
            try {
                setIsTraversing(true);
                const searchNum = parseInt(searchValue);
                let found = false;

                if (searchDirection === 'start') {
                    for (let i = 0; i < nodes.length && !found; i++) {
                        setCurrentTraversal(i);
                        await new Promise(resolve => setTimeout(resolve, 500));
                        if (nodes[i] === searchNum) {
                            setHighlightedIndex(i);
                            found = true;
                        }
                    }
                } else {
                    for (let i = nodes.length - 1; i >= 0 && !found; i--) {
                        setCurrentTraversal(i);
                        await new Promise(resolve => setTimeout(resolve, 500));
                        if (nodes[i] === searchNum) {
                            setHighlightedIndex(i);
                            found = true;
                        }
                    }
                }

                if (!found) {
                    setHighlightedIndex(-1);
                }
                await new Promise(resolve => setTimeout(resolve, 500));
            } finally {
                setCurrentTraversal(-1);
                setIsTraversing(false);
            }
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={() => navigate('/')} className="control-button home" >
                <span className="icon">🏠</span> Головна
            </button>
            <div className={styles.controls}>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Enter value"
                        className={styles.input}
                        disabled={isTraversing} />
                    <button onClick={addNodeToStart} className={styles.button} disabled={isTraversing}>
                        Add to the front
                    </button>
                    <button onClick={addNode} className={styles.button} disabled={isTraversing}>
                        Add to the end
                    </button>
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Find/Delete value"
                        className={styles.input}
                        disabled={isTraversing} />
                    <select
                        value={searchDirection}
                        onChange={(e) => setSearchDirection(e.target.value)}
                        className={styles.select}
                        disabled={isTraversing}>
                        <option value="start">Start from head (HEAD)</option>
                        <option value="end">Start from tail (TAIL)</option>
                    </select>
                    <select
                        value={deleteMode}
                        onChange={(e) => setDeleteMode(e.target.value)}
                        className={styles.select}
                        disabled={isTraversing}>
                        <option value="first">Delete firts found</option>
                        <option value="all">Delete all found</option>
                    </select>
                    <button onClick={searchNode} className={styles.button} disabled={isTraversing}>
                        Find
                    </button>
                    <button onClick={() => deleteByValue(parseInt(searchValue))} className={styles.button} disabled={isTraversing}>
                        Delete
                    </button>
                </div>
            </div>

            <div className={styles.list}>
                <div className={`${styles.nullNode} ${styles.head}`}>
                    <div className={styles.label}>HEAD</div>
                    <div>NULL</div>
                </div>

                {nodes.map((value, index) => [
                    <Arrow key={`prev-${index}`} direction="prev" isActive={activeLinks.prev === index} />,
                    <Node
                        key={index}
                        value={value}
                        prevValue={index > 0 ? nodes[index - 1] : undefined}
                        nextValue={index < nodes.length - 1 ? nodes[index + 1] : undefined}
                        onDelete={() => deleteNode(index)}
                        isHighlighted={index === highlightedIndex}
                        isTraversing={index === currentTraversal}
                        isActive={index === activeLinks.prev || index === activeLinks.next} />,
                    <Arrow key={`next-${index}`} direction="next" isActive={activeLinks.next === index} />
                ])}


                <div className={`${styles.nullNode} ${styles.tail}`}>
                    <div className={styles.label}>TAIL</div>
                    <div>NULL</div>
                </div>
            </div>
        </div>
    );
}; 