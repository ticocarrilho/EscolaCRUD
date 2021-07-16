import { Professor } from "./professor.type";

export interface Sala {
  id: number,
  nome_sala: string,
  professor?: Professor[]
}
