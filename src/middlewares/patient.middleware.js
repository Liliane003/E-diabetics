import ResponseService from '../services/response.service';
import patientService from '../services/patient.service';
import BcryptService from '../services/bcrypt.service';

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @return {object} this is going to verify a patient
 */
export const checkIfEmailExist = async (req, res, next) => {
	const patient = await patientService.findpatientByAttribute({ email: req.body.email });
	if (patient) {
		ResponseService.setError(409, 'email is already exist');
		return ResponseService.send(res);
	}
    next();
};
export const checkpatientCredentials = async (req, res, next) => {
	const patient = await patientService.findpatientByAttribute({ email: req.body.email });
	if (!patient) {
		ResponseService.setError(400, 'email not registered');
		return ResponseService.send(res);
	}
	const patientIsVerified = await patientService.findpatientByAttribute({
		email: req.body.email,
		isVerified: true,
	});
	if (!patientIsVerified) {
		ResponseService.setError(401, 'account is not verified');
		return ResponseService.send(res);
	}

	if (!BcryptService.comparePassword(req.body.password,patient.password)) {
		ResponseService.setError(401, 'Invalid email or password');
		return ResponseService.send(res);
	}
	next();
};


export const verifyIfAssigned = async (req, res, next) => {
	const patient = await patientService.findpatientByAttribute({ id: req.patientData.id });
	if (patient.dataValues.doctor_id === null) {
		ResponseService.setError(400, 'patient is not assigned to line doctor');
		return ResponseService.send(res);
	}
	next();
};
export const doctorCheck = async (req, res, next) => {
	const { role } = await patientService.findpatientByProperty({ id: req.patientData.id });
	if (role !== 'linedoctor') {
		ResponseService.setError(403, 'this action this action is only for doctors');
		return ResponseService.send(res);
	}
	next();
};
