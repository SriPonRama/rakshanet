import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Resource } from '../models/Resource.js';

const router = Router();

router.post('/', authenticate, authorize('authority', 'ngo', 'admin'), async (req, res) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      managedBy: req.user.id,
    });
    res.status(201).json(resource);
  } catch (err) {
    console.error('Create resource error', err);
    res.status(500).json({ message: 'Failed to create resource' });
  }
});

router.get('/', authenticate, async (_req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 }).limit(200);
    res.json(resources);
  } catch (err) {
    console.error('List resources error', err);
    res.status(500).json({ message: 'Failed to fetch resources' });
  }
});

export default router;

