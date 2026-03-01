import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  listUsers,
  updateUserRole,
  listIncidentsForModeration,
} from '../controllers/admin.controller.js';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/users', listUsers);
router.patch('/users/:id/role', updateUserRole);
router.get('/incidents', listIncidentsForModeration);

export default router;

