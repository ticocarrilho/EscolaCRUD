import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AlunoBody } from '../core/models/alunoBody.type';
import { Aluno } from '../core/models/aluno.type';

interface GetAlunosReturn {
  alunos: Aluno[],
  totalCount: number
}

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  constructor(private http: HttpClient) { }

  getAlunos(alunoName: string = '', page: string = ''): Observable<GetAlunosReturn> {
    return this.http
      .get<GetAlunosReturn>('aluno', {
        headers: {
          search: alunoName,
          page: page
        }
      });
  }

  getAluno(id: number): Observable<Aluno> {
    return this.http
      .get<Aluno>(`aluno/${id}`);
  }

  postAluno(body: AlunoBody): Observable<Aluno> {
    return this.http
      .post<Aluno>('aluno', body);
  }

  patchAluno(id: number, body: AlunoBody): Observable<Aluno> {
    return this.http
      .patch<Aluno>(`aluno/${id}`, body);
  }

  deleteAluno(id: number): Observable<void> {
    return this.http
      .delete<void>(`aluno/${id}`);
  }

}
