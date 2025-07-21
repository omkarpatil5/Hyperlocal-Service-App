import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, form);
      alert('Registered successfully');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-400">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={e => setForm({ ...form, name: e.target.value })} />

          <input type="email" placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={e => setForm({ ...form, email: e.target.value })} />

          <input type="password" placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={e => setForm({ ...form, password: e.target.value })} />
          <input
  type="tel"
  placeholder="Phone Number"
  className="w-full border border-gray-300 p-2 rounded"
  onChange={(e) => setForm({ ...form, phone: e.target.value })}
/>


          <select className="w-full p-3 rounded-lg border border-gray-300" onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>

          <button type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;