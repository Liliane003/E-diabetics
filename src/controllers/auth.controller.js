import BcryptService from '../services/bcrypt.service';
import TokenService from '../services/token.service';
import ResponseService from '../services/response.service';
import patientService from '../services/patient.service';

/**
 * This is the authentication class
 */
class AuthController {
	/**
   * @param {object} req
   * @param {object} res
   * @return {object} this is going to create a patient
   */
	static async signup(req, res) {
		const newpatient = await patientService.createpatient({
			fullname: req.body.fullname,
			email: req.body.email,
			password: BcryptService.hashPassword(req.body.password),
			birthdate: req.body.birthdate,
			gender: req.body.gender,
			tel: req.body.tel,
			country: req.body.country,
			city: req.body.city,
		});

		const patientData = {
			id: newpatient.id,
			fullname: newpatient.fullname,
			email: newpatient.email,
			birthdate: newpatient.birthdate,
			gender: newpatient.gender,
			tel: newpatient.tel,
			country: newpatient.country,
			city: newpatient.city,
			profilePicture: newpatient.profilePicture,
			role: newpatient.role,
			createdAt: newpatient.createdAt,
			updatedAt: newpatient.updatedAt,
		};

		ResponseService.setSuccess(201, 'thank you for your registration on E-diabetics ', {
			patient: patientData,
			token: TokenService.generateToken(patientData),
		});
		return ResponseService.send(res);
	}
	/**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} the patient will login successfully
   */
  static async login(req, res) {
	const patient = await patientService.findpatientByAttribute({
		email: req.body.email,
	});
	const patientData = { ...patient.dataValues };
	delete patientData.password;
	ResponseService.setSuccess(200, 'successfully logged in', {
		token: TokenService.generateToken(patientData),
	});
	return ResponseService.send(res);
}
static async patientlogout(req, res) {
	const { id } = req.body;
	await patientService.updatepatientByAttribute({ logoutTime: new Date() }, id);
	ResponseService.setSuccess(200, 'patient has logged out successfully');
	return ResponseService.send(res);
}
}

export default AuthController;