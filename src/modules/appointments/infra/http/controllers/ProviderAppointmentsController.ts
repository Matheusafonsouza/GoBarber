import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.query;

    const listProvidersAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointments = await listProvidersAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id: user_id,
    });

    return response.json(classToClass(appointments));
  }
}
