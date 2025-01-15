import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Match from './pages/Match';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/match/:id" element={<Match />} />
    </Routes>
  );
}

export default App;