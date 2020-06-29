import { Router } from "express";
import { uuid } from "uuidv4";
import { startOfHour, parseISO, isEqual } from "date-fns"; // yarn add date-fns
// startOfHour -> pega date e coloca uma hora no 0
// parseISO -> converte uma data em string para data em tipo date do JS

const appointmentsRouter = Router();

// para evitar o erro de "any", defino a estrutura do objeto com uma interface
interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

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

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate, // antes, tava dando erro: "date: parsedDate,"
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
