import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import GameInterface from './components/GameInterface';
import QuizGame from './components/QuizGame';
import LawyerGame from './components/LawyerGame';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ip-detective" element={<GameInterface />} />
        <Route path="/ip-quiz" element={<QuizGame />} />
        <Route path="/young-lawyer" element={<LawyerGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;