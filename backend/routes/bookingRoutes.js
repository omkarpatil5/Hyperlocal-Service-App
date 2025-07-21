import express from 'express';
import { bookService, getUserBookings } from '../controllers/bookingController.js';

import { getProviderBookings, updateBookingStatus } from '../controllers/bookingController.js';



const router = express.Router();

router.post('/', bookService);
router.get('/user/:userId', getUserBookings);
router.get('/user/:userId', getUserBookings); // for dashboard
router.get('/provider/:providerId', getProviderBookings);  // ✅ bookings for a provider
router.put('/:bookingId/status', updateBookingStatus);     // ✅ update status
export default router;
