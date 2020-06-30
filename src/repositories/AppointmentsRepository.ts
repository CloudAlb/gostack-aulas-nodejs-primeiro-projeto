// Persistência <-> Repositório <-> Rota
// "persistência dos dados"
// 1 repositório por model
// é uma classe que cuida de fazer as operações do BD e guardar as informações
// é uma das obrigações com o projeto, que é componentizar funções e evitar deixar tudo
// em um só programa

// find, create, list, update, etc.

import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

// DTO -> Aula 6, Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  // desestruturando os parâmetros para poder deixar o código melhor
  // no sentido de, se eu precisar de mais uma informação para criar um agendamento,
  // eu simplesmente altero o objeto (baseado em uma interface) -> CreateA
  // antes: public create(provider: string, date: Date): Appointment {...}
  public create({ provider, date }: CreateAppointmentDTO) {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  // observar que o retorno é Appointment OU null
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );

    // esse return funciona como um if else
    // retorna o findAppointment se encontrou
    // se não encontrou nada, retorna null
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
