/**
 * Class is for all response return message and errors
 */
class ResponseService {
	/**
   * @param {number} statusCode
   * @param {string} message
   * @param {object} data
   * @return {object} this is a setting success message for response service
   */
	static setSuccess(statusCode, message, data) {
		this.statusCode = statusCode;
		this.message = message;
		this.data = data;
		this.type = 'success';
	}

	/**
   * @param {number} statusCode
   * @param {string} message
   * @return {object} this is a setting error message for response service
   */
	static setError(statusCode, message) {
		this.statusCode = statusCode;
		this.message = message;
		this.type = 'error';
	}

	/**
   * @param {object} res
   * @return {object} this is a send response service
   */
	static send(res) {
		if (this.type === 'success') {
			return res.status(this.statusCode).json({
				status: this.statusCode,
				message: this.message,
				data: this.data,
			});
		}
		return res.status(this.statusCode).json({
			status: this.statusCode,
			message: this.message,
		});
	}
}
export default ResponseService;
