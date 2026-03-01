import { Router } from 'express';
import axios from 'axios';
import { authenticate, authorize } from '../middleware/auth.js';
import { config } from '../config/env.js';

const router = Router();

router.post('/predict-risk', authenticate, authorize('authority', 'admin'), async (req, res) => {
  try {
    const { location, incidentType, severityIndicators } = req.body;
    const response = await axios.post(
      `${config.aiServiceUrl}/predict-risk`,
      { location, incidentType, severityIndicators },
      { timeout: 5000 },
    );
    res.json(response.data);
  } catch (err) {
    console.error('AI predict-risk error', err.message);
    res.status(502).json({ message: 'AI service unavailable' });
  }
});

router.post('/analyze-image', authenticate, authorize('authority', 'rescue', 'admin'), async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    const response = await axios.post(
      `${config.aiServiceUrl}/analyze-damage`,
      { imageBase64 },
      { timeout: 10000 },
    );
    res.json(response.data);
  } catch (err) {
    console.error('AI analyze-image error', err.message);
    res.status(502).json({ message: 'AI service unavailable' });
  }
});

export default router;

