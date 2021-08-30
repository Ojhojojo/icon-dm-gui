import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseService {

  private baseUrl = environment.api;

  constructor(protected http: HttpClient, private controller: string) {}

  get(request: string, params?: HttpParams): Observable<any> {
    return params ? this.http.get(`${this.baseUrl}${this.controller}/${request}`, { params })
      : this.http.get(`${this.baseUrl}${this.controller}/${request}`);
  }

}
