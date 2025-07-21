import Review from '../models/Review.js';


export const submitReview = async (req, res) => {
  try {
    const { user, service, rating, comment } = req.body;

    if (!user || !service || !rating) {
      return res.status(400).json({ error: 'Missing fields in review' });
    }

    const review = new Review({ user, service, rating, comment });
    await review.save();

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
