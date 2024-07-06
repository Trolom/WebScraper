import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// Make jQuery globally available
window.$ = window.jQuery = $;

// Import jQuery plugins and other dependencies
import 'jquery-migrate';
import 'slick-carousel/slick/slick.min.js';
import 'waypoints/lib/noframework.waypoints.min';
import 'glightbox/dist/css/glightbox.min.css';
import 'aos/dist/aos.css';

// Import your custom script after all dependencies
import './custom';
import './styles/style.css';

import UserSettings from './pages/UserSettings';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import WaitingPage from './pages/WaitingPage';
import HeaderTop from './components/HeaderTop';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderTop />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/me" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
