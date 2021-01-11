import express from 'express';
import AuthRoute from './auth.route';
import appointmentRoute from './appointment.route';
import patientRoute from './patient.route';


const app = express();

app.use('/api/auth', AuthRoute);
app.use('/api/appointment', appointmentRoute);
app.use('/api/patient',patientRoute)

export default app;