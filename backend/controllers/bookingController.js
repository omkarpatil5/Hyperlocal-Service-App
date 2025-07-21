import Booking from '../models/Booking.js';

export const bookService = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('service', 'name price')
      .populate('provider', 'name');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.params.providerId })
      .populate('user', 'name')
      .populate('service', 'name price');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const updated = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

