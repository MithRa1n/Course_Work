import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Visualization of algorithms</h1>
            <div className="algorithms-grid">
                <Link to="/graph-algorithm" className="algorithm-card">
                    <h2>Dijkstra algorithm</h2>
                    <p>Visualization of finding the shortest path in a graph</p>
                </Link>
                <Link to="/data-structure" className="algorithm-card">
                    <h2>Data structures</h2>
                    <p>Visualization of working with data structures</p>
                </Link>
            </div>
        </div>
    );
}

export default Home;