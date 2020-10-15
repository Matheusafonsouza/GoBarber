import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/schedule', providerAppointmentsController.index);
appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
