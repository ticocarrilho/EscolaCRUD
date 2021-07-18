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
      .get<GetSalasReturn>('sala', {
        headers: {
          search: salaName,
          page: page
        }
      });
  }

  getSala(id: number): Observable<Sala> {
    return this.http
      .get<Sala>(`sala/${id}`);
  }

  postSala(body: SalaBody): Observable<Sala> {
    return this.http
      .post<Sala>('sala', body);
  }

  patchSala(id: number, body: SalaBody): Observable<Sala> {
    return this.http
      .patch<Sala>(`sala/${id}`, body);
  }

  deleteSala(id: number): Observable<void> {
    return this.http
      .delete<void>(`sala/${id}`);
  }

}
