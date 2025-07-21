import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const providerId = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/bookings/provider/${providerId}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, [providerId]);

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/bookings/${bookingId}/status`, { status: newStatus });
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">My Service Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {bookings.map(booking => (
            <div key={booking._id} className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold text-indigo-700">{booking.service?.name}</h3>
              <p className="text-gray-600">Customer: {booking.user?.name}</p>
              <p className="text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-2">Status: <span className="font-semibold">{booking.status}</span></p>

              {booking.status !== 'Completed' && (
                <button
                  onClick={() => updateStatus(booking._id, 'Completed')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
