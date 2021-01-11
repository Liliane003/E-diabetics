import Response from '../services/response.service';
import patientService from '../services/patient.service';
/**
 * patient controller class
 *  */
class patientController {
    /**
     *
     * @param {object} req
     * @param {object} res
     * @returns {object} get a specific patient from the database
     */
static async getSpecificpatient(req, res) {
    const patientProfile = await patientService.findpatientByAttribute({ id: req.patientData.id });
    const patientData = {
        id: patientProfile.id,
        first_name: patientProfile.first_name,
        last_name: patientProfile.last_name,
        email: patientProfile.email,
        gender: patientProfile.gender,
        birth_date: patientProfile.birth_date,
        isVerified: patientProfile.isVerified,
        createdAt: patientProfile.createdAt,
        updatedAt: patientProfile.updatedAt,
    };
    Response.setSuccess(200, 'patient information', patientData);
    return Response.send(res);
}
}
export default  patientController;