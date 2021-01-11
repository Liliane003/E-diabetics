/* eslint-disable import/prefer-default-export */
import { Op } from 'sequelize';
import appointmentService from '../services/appointment.service';
import ResponseService from '../services/response.service';

export const checkIfappointmentExist = async (req, res, next) => {
	const appointment = await appointmentService.findappointmentByAttribute({
		patientId: req.patientData.id,
	});
	if (appointment) {
		ResponseService.setError(409, 'appointment is already in database');
		return ResponseService.send(res);
	}
	next();
};
/**
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} this is for validating appointment
 */
export const validateEditappointment = async (req, res, next) => {
	const appointment = await appointmentService.findappointmentByAttribute({ id: req.params.id });
	if (!appointment) {
		ResponseService.setError(404, 'The appointment can not be found');
		return ResponseService.send(res);
	}
	if (req.patientData.role !== 'Requester') {
		ResponseService.setError(403, 'You can not perform this task');
		return ResponseService.send(res);
	}

	if (appointment.status !== 'pending') {
		ResponseService.setError(
			403,
			'The appointment request have sent sorry you can not edit'
		);
		return ResponseService.send(res);
	}

	if (req.patientData.id !== appointment.patientId) {
		ResponseService.setError(
			403,
			'Oooops you can not edit the appointment you have not created'
		);
		return ResponseService.send(res);
	}

	next();
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} This is a validation appointment
 */
export const validatecreateappointment = async (req, res, next) => {
	const appointment = await appointmentService.findappointmentByAttribute({
		patientId: req.patientData.id
	});
	if (appointment) {
		ResponseService.setError(
			409,
			'appointment was already created and it is still pending'
		);
		return ResponseService.send(res);
	}
	next();
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} this will check if the patient has returned appointment
 */
