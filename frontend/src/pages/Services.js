import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [reviewData, setReviewData] = useState({});
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/services`)
      .then(res => {
        setServices(res.data);

        res.data.forEach(service => {
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/reviews/service/${service._id}`)
            .then(r => {
              const reviews = r.data;
              const average = reviews.length
                ? (reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length).toFixed(1)
                : null;

              setReviewData(prev => ({
                ...prev,
                [service._id]: {
                  average,
                  total: reviews.length,
                  latest: reviews[reviews.length - 1]?.comment || ''
                }
              }));
            });
        });
      });
  }, []);

  const filtered = services.filter(service =>
    service.name.toLowerCase().includes(search.toLowerCase()) ||
    service.category.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * servicesPerPage;
  const indexOfFirst = indexOfLast - servicesPerPage;
  const currentServices = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / servicesPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Popular Services</h2>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="w-full p-2 border border-gray-300 rounded"
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {currentServices.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentServices.map(service => (
            <div key={service._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>

                <p className="text-sm text-gray-500 mt-1">
                  Provided by: <span className="text-indigo-700 font-medium">{service.provider?.name || 'Unknown'}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  📞 {service.provider?.phone || 'N/A'}
                </p>

                <p className="mt-2 text-green-600 font-semibold">₹{service.price}</p>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                {reviewData[service._id]?.average ? (
                  <>
                    ⭐ {reviewData[service._id].average} / 5 ({reviewData[service._id].total} reviews)<br />
                    <em>"{reviewData[service._id].latest}"</em>
                  </>
                ) : (
                  <span>No reviews yet</span>
                )}
              </div>

              {localStorage.getItem('user') ? (
  <Link to={`/book/${service._id}`}>
    <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
      Book Now
    </button>
  </Link>
) : (
  <p className="mt-4 text-red-500 text-sm">Login to book this service</p>
)}

            </div>
          ))}
        </div>
      )}

      {/* Numbered Pagination Controls */}
      {totalPages > 1 && (
  <div className="flex justify-center gap-2 mt-10 flex-wrap">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`w-10 h-10 flex items-center justify-center text-sm font-semibold ${
          currentPage === index + 1
            ? 'bg-indigo-700 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-indigo-100'
        } rounded-full transition`}
      >
        {index + 1}
      </button>
    ))}
  </div>
)}

    </div>
  );
};

export default Services;
