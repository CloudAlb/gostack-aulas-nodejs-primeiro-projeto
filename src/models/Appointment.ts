// models (ou entidade) servem para ditar como deve ser o formato de algo que vai ser utilizado
// isso foi feito anteriormente com Interfaces
// models são feitos no formato de classes
// os atributos devem ter uma linha em branco os separando
// construtores

import { uuid } from "uuidv4";
import { id } from "date-fns/locale";

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // não precisei de uma interface aqui, pois defini os parâmetros
  // do construtor como a própria classe, omitindo o id (que é gerado automaticamente)
  constructor({ provider, date }: Omit<Appointment, "id">) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

// para disponibilizar a classe externamente
export default Appointment;
