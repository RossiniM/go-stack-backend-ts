import { Router, Request, Response } from 'express';

const appointmentRouter = Router();

appointmentRouter.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Hello' });
});

export default appointmentRouter;
