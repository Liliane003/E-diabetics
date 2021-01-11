import { Router } from 'express';
import appointmentController from '../controllers/appointment.controller';
import protectRoute from '../middlewares/protect-route.middleware';
import { appointmentValidation } from '../validations/appointment.validation';

const router = Router();

router.post(
	'/appointment',
	protectRoute,
	appointmentValidation,
	appointmentController.returnappointmentController
);



export default router;
