import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantMenuPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
