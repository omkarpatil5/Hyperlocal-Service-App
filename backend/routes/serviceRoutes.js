import express from 'express';
import {
  getAllServices,
  createService,
  getServiceById
} from '../controllers/serviceController.js';

const router = express.Router();

router.post('/', createService);
router.get('/', getAllServices);
router.get('/:id', getServiceById); // ✅ Important

export default router;
