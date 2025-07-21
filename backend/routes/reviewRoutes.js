import express from 'express';
import { submitReview, getServiceReviews } from '../controllers/reviewController.js';
import Review from '../models/Review.js'; // ✅ Import model

const router = express.Router();

router.post('/', submitReview);
router.get('/service/:serviceId', getServiceReviews);

// ✅ ADD THIS NOW:
router.get('/user/:userId/service/:serviceId', async (req, res) => {
  try {
    const { userId, serviceId } = req.params;
    const review = await Review.findOne({ user: userId, service: serviceId });
    res.json({ exists: !!review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
