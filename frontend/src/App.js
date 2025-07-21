import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // ✅ NEW
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import BookService from './pages/BookService';
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import Home from './pages/Home';
import AddService from './pages/AddService';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* ✅ Insert Navbar here */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book/:serviceId" element={<BookService />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/provider" element={<ProviderDashboard />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
