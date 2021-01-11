/* eslint-disable import/no-named-as-default-member */
import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { validatePatientSignup,validatepatientLoginBody } from '../validations/patient.validation';
import {
	checkIfEmailExist,
	checkpatientCredentials,
} from '../middlewares/patient.middleware';

import protectRoute from '../middlewares/protect-route.middleware';

const router = Router();

router.post(
	'/signup',
	validatePatientSignup,
	checkIfEmailExist,
	AuthController.signup
);
router.post(
	'/login',
	validatepatientLoginBody,
	checkpatientCredentials,
	AuthController.login
);
router.patch(
	'/logout',
	protectRoute,
	AuthController.patientlogout
)
export default router;