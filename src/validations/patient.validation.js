import Joi from 'joi';
import ResponseService from '../services/response.service';

export const validatePatientSignup = (req, res, next) => {
	const schema = Joi.object({
		fullname: Joi.string()
			.allow('')
			.trim()
			.strict()
			.min(3)
			.max(30)
			.required()
			.messages({
				'string.empty': 'fullname is not allowed to be empty',
				'string.min': 'fullname length must be at least 3 characters long',
				'string.max':
          ' fullname length must be less than or equal to 30 characters long',
				'any.required': 'fullname is required',
				'string.trim':
          'fullname must not have white spces at the beginning and at the end',
			}),
		email: Joi.string().email().required().messages({
			'string.email': 'Please enter a valid email address',
			'any.required': 'email is required',
			'string.empty': 'email is not allowed to be empty',
		}),
		password: Joi.string()
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
			.required()
			.messages({
				'string.pattern.base':
          'password should contain uppercase,lowercase,specialCharacter,and number',
				'any.required': 'password is required',
				'string.empty': 'password is not allowed to be empty',
			}),

		phonenumber: Joi.string()
			.length(10)
			.regex(/^[0-9]+$/)
			.required()
			.messages({
				'string.length': 'phone number length must be 10 characters long',
				'any.required': 'phone number is required',
				'string.empty': 'phone number is not allowed to be empty',
				'string.pattern.base':
          'phone number must be number between 0-9 no characters allowed',
            }),
            
		address: Joi.string().trim().strict().min(3)
        .max(30)
        .required()
        .messages({
            'string.min': 'addresslength must be at least 3 characters long',
            'string.max':
    'addresslength must be less than or equal to 15 characters long',
            'string.empty': 'addressis not allowed to be empty',
            'any.required': 'addressis required',
            'string.trim':
    'addressmust not have white spces at the beginning and at the end',
        }),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);
	if (error) {
		const errors = error.details.map((e) => e.message);
		ResponseService.setError(402, errors);
		return ResponseService.send(res);
	}

	next();
};
/** }
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @return {object} this is going to verify a patient
 */
export const validatepatientRoleBody = (req, res, next) => {
	const schema = Joi.object({
		patientId: Joi.string()
			.regex(/^[0-9]{1,}$/)
			.required()
			.messages({
				'string.pattern.base': 'patientId must be a number',
			}),

		role: Joi.string()
			.trim()
			.valid(
				'superAdmin',
				'Travel-Administrator',
				'Travel-Team-Member',
				'Manager',
				'Requester'
			)
			.required()
			.messages({
				'any.required': 'role is required',
				'any.only':
          'Roles must be one of [superAdmin, Travel-Administrator, Travel-Team-Member, Manager, Requester]',
			}),
	}).options({ abortEarly: false });

	const { error } = schema.validate({ ...req.params, ...req.body });

	if (error) {
		const errors = error.details.map((err) => err.message);

		ResponseService.setError(402, errors);
		return ResponseService.send(res);
	}

	next();
};
export const validatepatientLoginBody = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			'any.required': 'Email is required',
			'string.email': 'Email must be a valid email',
			'string.empty': 'Email must not be empty',
		}),
		password: Joi.string().required().messages({
			'any.required': 'Password is required',
			'string.empty': 'Password must not be empty',
		}),
	}).options({ abortEarly: false });

	const { error } = schema.validate(req.body);

	if (error) {
		const errors = error.details.map((err) => err.message);
		ResponseService.setError(422, errors);
		return ResponseService.send(res);
	}
	next();
};