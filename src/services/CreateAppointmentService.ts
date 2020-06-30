// um serviço tem exclusivamente UMA função
// e é em formato de classe
import { startOfHour } from "date-fns";

import Appointment from "../models/Appointment";
import appointmentsRepository from "../repositories/AppointmentsRepository";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

/* Preciso resolver 3 problemas aqui
    1. [x] Recebimento das informações (em parâmetros)
    2. [x] Tratativa de erros/excessões (return 400)
    3. [x] Acesso ao repositório
*/

// SOLID
// Single Resposability Principle - cada arquivo de service tem uma única responsabilidade
// Dependency Invertion Principle


// isso é um DTO
// apesar de ter mais código igual a isso, é bom repetir aqui
// mas apenas porque essa estrutura pode não se repitir nos outros trechos
// "coisas que aqui não precisaria pedir"
interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  // princípio: Dependency Inversion (SOLID), (útil em CRUD)
  // receber o repositório existente como parâmetro
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  // método comum para todo service
  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      // de response foi para throw Error
      // isso se dá pois o service não tem acesso ao Request e ao Response, do express
      // isso será tratado melhor depois (code 400, etc)
      throw Error("This appointment is already booked.");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate, // importante especificar que é um date, se não dá erro
    });

    return appointment;
  }
}

export default CreateAppointmentService;
