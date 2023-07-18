import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TeamSelection from './components/TeamSelection';
import SchedulePage from './pages/SchedulePage';
import Home from './pages/Home';

const App = () => {
  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/team-selection" element={<TeamSelection/>} />
    <Route path="/schedule/:teamId/:season" element={<SchedulePage/>} />
  </Routes>
</BrowserRouter>


  );
};

export default App;