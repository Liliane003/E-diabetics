import models from '../database/models';

const { patient, appointments } = models;

/**
 * this is a patient service
 */
class patientService {

	/**
   * @param {object} patient
   * @return {object} this is a service for creating a patient
   */
	static async createpatient(patients) {
		return patient.create(patients);
	}
	static async createappointment(appointment) {
		return appointments.create(appointment);
	}

	/**
   * @param {object} attribute
   * @param {object} property
   * @return {object} update patient by attribute
   */
	static async updatepatientByAttribute(attribute, property) {
		return patient.update(property, { where: attribute });
	}

	/**
   * @param {object} attribute
   * @returns {object} getting a patient that is already logged in
   */
	static async findpatientByAttribute(attribute) {
		return patient.findOne({ where: attribute });
	}

	/**
   * @param {string} instance
   * @param {object} property
   * @returns {object} this update a given patient
   */
	static updateProperty(instance, property) {
		return patient.update(property, { where: instance });
	}

	/**
   *
   * @param {object} property
   * @param {object} property1
   * @returns {object} this return a given patient based by property
   */
	static async findpatientByProperty(property) {
		return patient.findOne({ where: property });
	}

	/**
   * @param {integer} managerId id of the manager to be finding
   * @returns {object} data of the manager found
   */
	static async assignpatientManager(managerId) {
		const managerData = await models.assignpatientManager(db.patient, managerId);

		if (!managerData) return false;
		return true;
	}

	/**
   *
   * @param {object} property
   * @returns {object} this return a given patient based by property
   */
}
export default patientService;
