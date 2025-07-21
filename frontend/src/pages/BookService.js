import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/services/${serviceId}`);
        setService(res.data);
      } catch (err) {
        console.error('Error fetching service:', err);
        alert('Service not found.');
        navigate('/services');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId, navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/bookings`, {
        user: userId,
        provider: service.provider._id,
        service: service._id,
        date
      });
      alert('Booking successful!');
      navigate('/dashboard/user');
    } catch (err) {
      alert('Booking failed');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading service...</p>;
  if (!service) return <p className="text-center mt-10 text-red-500">Service not found.</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2 text-indigo-700">{service.name}</h2>
        <p className="mb-1 text-gray-600">{service.description}</p>
        <p className="mb-4 text-green-600 font-semibold">₹{service.price}</p>

        <form onSubmit={handleBooking} className="space-y-4">
          <label className="block">
            Booking Date:
            <input
              type="date"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookService;
