import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Incident } from '../models/Incident.js';
import { User } from '../models/User.js';

const router = Router();

router.post('/', authenticate, authorize('citizen', 'authority', 'ngo'), async (req, res) => {
  try {
    const incident = await Incident.create({
      ...req.body,
      reportedBy: req.user.id,
    });
    res.status(201).json(incident);
  } catch (err) {
    console.error('Create incident error', err);
    res.status(500).json({ message: 'Failed to create incident' });
  }
});

router.get('/', authenticate, async (_req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 }).limit(500);
    res.json(incidents);
  } catch (err) {
    console.error('List incidents error', err);
    res.status(500).json({ message: 'Failed to fetch incidents' });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ message: 'Incident not found' });
    res.json(incident);
  } catch (err) {
    console.error('Get incident error', err);
    res.status(500).json({ message: 'Failed to fetch incident' });
  }
});

router.patch('/:id/status', authenticate, authorize('rescue', 'authority', 'admin'), async (req, res) => {
  try {
    const { status, assignedTo, severity } = req.body;
    const updateData = { status };
    
    if (severity) updateData.severity = severity;
    
    if (req.user.role === 'authority' || req.user.role === 'admin') {
      if (status === 'assigned') {
        const rescueUser = await User.findOne({ role: 'rescue' });
        updateData.assignedTo = rescueUser?._id || assignedTo;
      }
    } else if (assignedTo) {
      updateData.assignedTo = assignedTo;
    }
    
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );
    if (!incident) return res.status(404).json({ message: 'Incident not found' });
    res.json(incident);
  } catch (err) {
    console.error('Update incident status error', err);
    res.status(500).json({ message: 'Failed to update incident' });
  }
});

export default router;

