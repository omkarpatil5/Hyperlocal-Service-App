import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }
});

export default mongoose.model('Service', serviceSchema);
