import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ProfessorBody } from '../core/models/professorBody.type';
import { Professor } from '../core/models/professor.type';

interface GetProfessoresReturn {
  professores: Professor[],
  totalCount: number
}

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {

  constructor(private http: HttpClient) { }

  getProfessores(professorName: string = '', page: string = ''): Observable<GetProfessoresReturn> {
    return this.http
      .get<GetProfessoresReturn>('professor', {
        headers: {
          search: professorName,
          page: page
        }
      });
  }

  getProfessor(id: number): Observable<Professor> {
    return this.http
      .get<Professor>(`professor/${id}`);
  }

  postProfessor(body: ProfessorBody): Observable<Professor> {
    return this.http
      .post<Professor>('professor', body);
  }

  patchProfessor(id: number, body: ProfessorBody): Observable<Professor> {
    return this.http
      .patch<Professor>(`professor/${id}`, body);
  }

  deleteProfessor(id: number): Observable<void> {
    return this.http
      .delete<void>(`professor/${id}`);
  }

}
