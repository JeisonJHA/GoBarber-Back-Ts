import { injectable, inject } from 'tsyringe';

import IAppointmentRepository from '../repositories/IAppointmentRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const appointments = this.appointmentsRepository.findAvailableHoursInDaysProvider(
      { provider_id, day, month, year }
    );
    return appointments;
  }
}