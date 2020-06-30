import { Router } from "express";
import { parseISO } from "date-fns"; // yarn add date-fns

import AppointmentsRepository from "../repositories/AppointmentsRepository"; // não deve ser possível importar depois do cabeçalho
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// DTO - Data Transfer Object
// usar objetos para transferir dados entre arquivos

// SoC: Separation of Concerns (Separação de Preocupações)
// cada rota se preocupa com apenas uma coisa
// uso "services", regras de negócio, para diminuir esses concers
// regras de negócio: consistência, especificações

// Rota: receber uma requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.get("/", (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post("/", (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const CreateAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = CreateAppointment.execute({
      date: parsedDate,
      provider,
    });
    // por estar usando objeto, a ordem dos parâmetros não é importante

    return response.json(appointment);
  } catch (err) {
    // caputra throw's dos métodos que o trecho do try chama
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;

// mudanças: "A rota cada vez vai perdendo mais responsabilidades"
// isso é desacoplamento de código -> Arquitetura de Software
// 1. não precisei criar um objeto appointment, apenas instanciei uma classe do tipo AppointmentsRepository
// 2. como o uuid agora é do model appointment, não preciso mais importar o uuid nesse arquivo
