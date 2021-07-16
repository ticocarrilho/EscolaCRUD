import { Sala } from "./sala.type";

export interface Professor {
  id: number,
  nome: string,
  sala?: Sala
}
