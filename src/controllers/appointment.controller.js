import ResponseService from '../services/response.service';
// import patientService from '../services/patient.service';
import appointmentService from '../services/appointment.service';

/**
 * thuuu
 */
class appointmentController {

	/**
   * @param {object} req
   * @param {object} res
   * @returns {response} @memberof appointments
   */
  static async returnappointmentController(req, res) {
	const newappointmentRequest = {
		...req.body,
		patientId: req.patientData.id,
		appointmentType: 'appointment',
		status: 'pending',
	};
	const appointment = await appointmentService.createappointment(newappointmentRequest);
	const { updatedAt, createdAt, ...newappointment } = appointment.dataValues;
	ResponseService.setSuccess(
		201,
		'appointment request is successfully created',
		newappointment
	);
	return ResponseService.send(res);
}

}
export default appointmentController;