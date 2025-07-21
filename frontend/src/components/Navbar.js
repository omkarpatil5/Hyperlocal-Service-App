import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-md p-4 flex gap-6 justify-center text-indigo-700 font-semibold">
      <a href="/" className="hover:text-indigo-900">Home</a>

      {!user && (
        <>
          <a href="/register" className="hover:text-indigo-900">Register</a>
          <a href="/login" className="hover:text-indigo-900">Login</a>
        </>
      )}

      <a href="/services" className="hover:text-indigo-900">Services</a>

      {user?.role === 'user' && (
        <a href="/dashboard/user" className="hover:text-indigo-900">User Dashboard</a>
      )}

      {user?.role === 'provider' && (
        <>
          <a href="/dashboard/provider" className="hover:text-indigo-900">Provider Dashboard</a>
          <a href="/add-service" className="hover:text-indigo-900">Add Service</a>
        </>
      )}

      {user && (
        <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
