import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request: Request, response: Response) => {
  return response
    .status(200)
    .json({ appointments: appointmentRepository.all() });
});

appointmentsRouter.post('/', (request: Request, response: Response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const appointment = new CreateAppointmentService(
      appointmentRepository,
    ).execute({ provider, date: parsedDate });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
