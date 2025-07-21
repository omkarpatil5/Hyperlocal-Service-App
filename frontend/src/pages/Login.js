import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // ✅ import context

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // ✅ get setUser from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, form);

      // ✅ Debug
      console.log('Login response:', res.data);

      // ✅ Save to localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);

      // ✅ Update context immediately
      setUser(res.data.user);

      alert('Login successful');

      // ✅ Redirect based on role
      if (res.data.user.role === 'provider') {
        navigate('/dashboard/provider');
      } else {
        navigate('/services');
      }

    } catch (err) {
      alert('Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="w-full border border-gray-300 p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="provider">Provider</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
