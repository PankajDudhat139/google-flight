import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import FlightDetail from './pages/FlightDetail';
import './App.css'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/flights/:id" element={<FlightDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
