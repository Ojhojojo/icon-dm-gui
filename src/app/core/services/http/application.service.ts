import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http, 'application');
  }

}
