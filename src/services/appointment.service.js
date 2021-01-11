import models from '../database/models';

// const { appointments } = models;

/**
 * this is a user service
 */
class appointmentService {
// 	/**
//    * @param {object} attribute
//    * @param {object} property
//    * @return {object} update user by attribute
//    */
// 	static async updateappointmentByAttribute(attribute, property) {
// 		return Appointments.update(property, { where: attribute });
// 	}

// 	/**
//    * @param {object} attribute
//    * @returns {object} getting a user that is already logged in
//    */
// 	static findappointmentByAttribute(attribute) {
// 		return Appointments.findOne({ where: attribute });
// 	}

	/**
   *
   *
   * @static
   * @param {newappointment} newappointment
   * @returns {newappointment} @memberof appointmentService
   */
	static createappointment(newappointment) {
		return models.appointment.create(newappointment);
	}
}
export default appointmentService;
