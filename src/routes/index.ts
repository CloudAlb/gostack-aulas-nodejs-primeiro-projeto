import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
// o .use() significa -> toda rota que começar com /appointments
// será repassada para o appointmentsRouter

export default routes;