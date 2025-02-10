import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Interactive from './pages/Interactive';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/interactive" element={<Interactive />} />
    </Routes>
  );
}

export default App;