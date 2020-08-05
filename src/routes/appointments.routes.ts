import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request: Request, response: Response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.status(200).json(appointments);
});

appointmentsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const appointmentService = new CreateAppointmentService();
    const appointment = await appointmentService.execute({
      provider_id,
      date: parsedDate,
    });
    return response.status(200).json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
