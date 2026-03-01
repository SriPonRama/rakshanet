import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Alert } from '../models/Alert.js';

const router = Router();

router.post('/', authenticate, authorize('authority', 'admin'), async (req, res) => {
  try {
    const alert = await Alert.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(alert);
  } catch (err) {
    console.error('Create alert error', err);
    res.status(500).json({ message: 'Failed to create alert' });
  }
});

router.get('/', authenticate, async (_req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(200);
    res.json(alerts);
  } catch (err) {
    console.error('List alerts error', err);
    res.status(500).json({ message: 'Failed to fetch alerts' });
  }
});

export default router;

