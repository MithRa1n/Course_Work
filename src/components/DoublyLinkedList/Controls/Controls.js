import React from 'react';
import './Controls.css';

function Controls({ inputValue, setInputValue, searchValue, setSearchValue, currentOperation, setCurrentOperation, onAddFront, onAddBack, onSearch, isAnimating }) {
    return (
        <div className="controls">
            <div className="operation-selector">
                <button className={`operation-button ${currentOperation === 'insert' ? 'active' : ''}`} onClick={() => setCurrentOperation('insert')}
                    disabled={isAnimating}>
                    Insert
                </button>
                <button className={`operation-button ${currentOperation === 'search' ? 'active' : ''}`} onClick={() => setCurrentOperation('search')} disabled={isAnimating}>
                    Find
                </button>
            </div>

            <div className="operation-controls">
                {currentOperation === 'insert' ? (
                    <div className="insert-controls">
                        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter value" />
                        <button onClick={onAddFront} disabled={isAnimating}>
                            Add to the front
                        </button>
                        <button onClick={onAddBack} disabled={isAnimating}>
                            Add from the back
                        </button>
                    </div>
                ) : (
                    <div className="search-controls">
                        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Пошук значення" />
                        <button onClick={onSearch} disabled={isAnimating}>
                            Find
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Controls;