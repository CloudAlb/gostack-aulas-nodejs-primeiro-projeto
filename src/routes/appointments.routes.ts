import { Router } from "express";
import { startOfHour, parseISO, isEqual } from "date-fns"; // yarn add date-fns

import AppointmentsRepository from "../repositories/AppointmentsRepository"; // não deve ser possível importar depois do cabeçalho

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// rota que terá informações repassadas
appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: "This appointment is already booked." });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

export default appointmentsRouter;

// mudanças: "A rota cada vez vai perdendo mais responsabilidades"
// isso é desacoplamento de código -> Arquitetura de Software
// 1. não precisei criar um objeto appointment, apenas instanciei uma classe do tipo Appointment
// 2. como o uuid agora é do model appointment, não preciso mais importar o uuid nesse arquivo
