import { Router } from 'express';
import patientController from '../controllers/patient.controller';
import protectRoute from '../middlewares/protect-route.middleware';

const router = Router();
router.get('/profile', protectRoute, patientController.getSpecificpatient);

export default router;