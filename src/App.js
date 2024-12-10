import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import { DoublyLinkedList } from './components/DoublyLinkedList/DoublyLinkedList/DoublyLinkedList';
import DijkstraGraphVisualition from './components/GraphAlgorithm/DijkstraGraphVisualition/DijkstraGraphVisualition';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graph-algorithm" element={<DijkstraGraphVisualition />} />
      <Route path="/data-structure" element={<DoublyLinkedList />} />
    </Routes>
  );
}

export default App;
