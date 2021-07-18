import { Professor } from "./professor.type";

export interface Aluno {
  id: number,
  nome: string,
  professor?: Professor,
  formatted_professor?: string,
  formatted_sala?: string
}
