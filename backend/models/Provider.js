import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  services: [String],
  rating: { type: Number, default: 0 }
});

export default mongoose.model('Provider', providerSchema);
