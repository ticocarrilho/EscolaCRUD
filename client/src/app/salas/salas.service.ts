import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Sala } from '../core/models/sala.type';
import { SalaBody } from '../core/models/salaBody.type';

interface GetSalasReturn {
  salas: Sala[],
  totalCount: number
}

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  constructor(private http: HttpClient) { }

  getSalas(salaName: string = '', page: string = ''): Observable<GetSalasReturn> {
    return this.http
      .get<GetSalasReturn>('http://localhost:3001/api/sala', {
        headers: {
          search: salaName,
          page: page
        }
      });
  }

  getSala(id: number): Observable<Sala> {
    return this.http
      .get<Sala>(`http://localhost:3001/api/sala/${id}`);
  }

  postSala(body: SalaBody): Observable<Sala> {
    return this.http
      .post<Sala>('http://localhost:3001/api/sala', body);
  }

  patchSala(id: number, body: SalaBody): Observable<Sala> {
    return this.http
      .patch<Sala>(`http://localhost:3001/api/sala/${id}`, body);
  }

  deleteSala(id: number): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:3001/api/sala/${id}`);
  }

  getProfessores() {
    return this.http
      .get('http://localhost:3001/api/professor');
  }

}
