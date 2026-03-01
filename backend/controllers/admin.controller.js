import { User } from '../models/User.js';
import { Incident } from '../models/Incident.js';

export const listUsers = async (_req, res) => {
  try {
    const users = await User.find().select('name email role createdAt').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('List users error', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select(
      'name email role',
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Update user role error', err);
    res.status(500).json({ message: 'Failed to update role' });
  }
};

export const listIncidentsForModeration = async (_req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 }).limit(200);
    res.json(incidents);
  } catch (err) {
    console.error('List moderation incidents error', err);
    res.status(500).json({ message: 'Failed to fetch incidents' });
  }
};

