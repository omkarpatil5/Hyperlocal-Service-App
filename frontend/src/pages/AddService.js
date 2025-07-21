import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddService = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!user || user.role !== 'provider') {
    return <p className="text-center mt-10 text-red-600">Access Denied: Only providers can add services.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/services`, {
        ...form,
        provider: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert('Service added successfully!');
      navigate('/services');
    } catch (err) {
      console.error(err);
      alert('Failed to add service.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-indigo-700 text-center">Add New Service</h2>

        <input
          type="text"
          placeholder="Service Name"
          className="w-full border border-gray-300 p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price (₹)"
          className="w-full border border-gray-300 p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Category (e.g. home, repair)"
          className="w-full border border-gray-300 p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
