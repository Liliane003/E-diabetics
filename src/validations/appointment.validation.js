/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import ResponseService from '../services/response.service';
import appointmentService from '../services/appointment.service';

export const appointmentValidation = async (req, res, next) => {
	const appointment = await appointmentService.findappointmentByAttribute({
		patientId: req.patientData.id,
	});
	const schema = Joi.object({
		appointmentdate: Joi.date()
			.greater('now')
			.utc()
			.format('YYYY-MM-DD')
			.optional()
			.messages({
				'date.greater': 'appointment date" must not be in the past',
				'date.format': 'appointment  date must have format YYYY-MM-DD',
				'date.trim': 'date must not have white spces at the beginning and at the end',
			}),
		appointmentTime: Joi.date()
			.greater(req.body.startingDate || appointment.dataValues.startingDate)
			.utc()
			.format('YYYY-MM-DD')
			.optional()
			.messages({
				'date.greater': 'returning date" must be greater than strting date',
				'date.format': 'returning date must have format YYYY-MM-DD',
				'date.trim': 'date must not have white spces at the beginning and at the end',
            }),
            address: Joi.number().integer().min(1).optional()
			.messages({
				'number.base': 'address must be a an id',
				'number.empty': 'address must not be empty',
				'number.trim': 'number must not have white spces at the beginning and at the end',
            }),
            appointmenttype: Joi.number().integer().min(1).optional()
			.messages({
				'number.base': 'appointmenttype must be a an id',
				'number.empty': 'appointmenttype must not be empty',
				'number.trim': 'number must not have white spces at the beginning and at the end',
			}),
		reason: Joi.string().trim().strict().min(3)
			.max(30)
			.optional()
			.messages({
				'string.min': 'reason length must be at least 3 characters long',
				'string.max':
        'reason length must be less than or equal to 15 characters long',
				'string.empty': 'reason is not allowed to be empty',
				'string.trim':
        'reason must not have white spces at the beginning and at the end',
			}),
	}).options({ abortEarly: false });
	const { error } = schema.validate(req.body);
	if (error) {
		const errors = error.details.map((e) => e.message);
		ResponseService.setError(400, errors);
		return ResponseService.send(res);
	}
	if (Object.entries(req.body).length === 0) {
		ResponseService.setError(
			402,
			'Please you should keep that empty is never edited'
		);
		return ResponseService.send(res);
	}
	next();
};
