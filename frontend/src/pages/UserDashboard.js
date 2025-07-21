import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [reviewedServices, setReviewedServices] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

 useEffect(() => {
  const fetchBookingsAndReviews = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/bookings/user/${userId}`);
      const bookings = res.data;
      setBookings(bookings);

      const statusMap = {};

      for (const booking of bookings) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/reviews/user/${userId}/service/${booking.service._id}`
          );
          statusMap[booking._id] = response.data.exists;
        } catch (err) {
          statusMap[booking._id] = false;
        }
      }

      setReviewedServices(statusMap);
      console.log("✅ Mapped reviewedServices:", statusMap);
    } catch (err) {
      console.error("Error loading bookings or reviews:", err);
    }
  };

  fetchBookingsAndReviews();
}, [userId]);


  const handleReview = async (booking) => {
    const rating = prompt("Enter rating (1-5):");
    const comment = prompt("Write your review:");

    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      alert("Rating must be a number between 1 and 5.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/reviews`, {
        user: userId,
        service: booking.service._id,
        rating: Number(rating),
        comment
      });
      alert('Review submitted!');

      // Mark as reviewed in UI
      setReviewedServices(prev => ({
        ...prev,
        [booking._id]: true
      }));
    } catch (err) {
      console.error('Review error:', err);
      alert('Failed to submit review');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-indigo-700">
                {booking.service?.name}
              </h3>
              <p className="text-gray-600 mt-1">
                Provider: {booking.provider?.name}
              </p>
              <p className="text-gray-600 mt-1">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="mt-2 font-semibold">
                Status: <span className="text-indigo-600">{booking.status}</span>
              </p>

              {booking.status === 'Completed' && !reviewedServices[booking._id] && (
                <button
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleReview(booking)}
                >
                  Leave a Review
                </button>
              )}

              {booking.status === 'Completed' && reviewedServices[booking._id] && (
                <p className="mt-4 text-green-600 font-medium">Review Submitted ✅</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
