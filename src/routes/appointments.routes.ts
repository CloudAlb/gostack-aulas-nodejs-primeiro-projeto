import { Router } from "express";
import { startOfHour, parseISO, isEqual } from "date-fns"; // yarn add date-fns
import Appointment from '../models/Appointment';
// startOfHour -> pega date e coloca uma hora no 0
// parseISO -> converte uma data em string para data em tipo date do JS

const appointmentsRouter = Router();

// antes, sem interface: "const appointments = [];""
const appointments: Appointment[] = [];

// rota que terá informações repassadas
appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  // verificação se já existe um agendamento nessa data
  const findAppointmentInSameDate = appointments.find((appointment) =>
    isEqual(parsedDate, appointment.date)
  );

  // se houver
  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: "This appointment is already booked." });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;

// mudanças
// 1. não precisei criar um objeto appointment, apenas instanciei uma classe do tipo Appointment
// 2. como o uuid agora é do model appointment, não preciso mais importar o uuid nesse arquivo