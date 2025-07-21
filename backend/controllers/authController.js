import User from '../models/User.js';
import Provider from '../models/Provider.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ Register Controller
export const register = async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const Model = role === 'provider' ? Provider : User;
    const newUser = new Model({
      name,
      email,
      password: hashedPassword,
      role,
      ...(role === 'provider' && { phone }) // ✅ Only add phone for providers
    });

    await newUser.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  const Model = role === 'provider' ? Provider : User;

  try {
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role || role }, process.env.JWT_SECRET);
    const fullUser = { ...user._doc, role: user.role || role };

    res.json({ token, user: fullUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

