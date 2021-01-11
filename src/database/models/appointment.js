module.exports = (sequelize, DataTypes) => {
	const appointment = sequelize.define(
		'appointment',
		{
    email: DataTypes.STRING,
    reason: DataTypes.STRING,
    appointmentdate: DataTypes.DATE,
    appointmentTime: DataTypes.TIME,
    status: DataTypes.STRING,
    address: DataTypes.STRING
  }, {}
  );
  
	appointment.associate = (models) => {
		appointment.belongsTo(
			models.patient,
			{ foreignKey: 'id' },
			{ onDelete: 'cascade' },
			{ onUpdate: 'cascade' }
		);
	};
  return appointment;
};