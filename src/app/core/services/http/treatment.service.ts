import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { SocketClientService } from '../websocket/socket-client.service';
import { Treatment } from 'src/app/shared/models/treatment.model';
import { Observable } from 'rxjs';
import { TreatmentChain } from 'src/app/shared/models/treatment-chain.model';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService extends BaseService {

  private appId: number;

  constructor(protected http: HttpClient, private socketClient: SocketClientService) {
    super(http, 'treatment');
  }

  run(treatment: Treatment): void {
    console.log(treatment);
    this.socketClient.send(`/topic/${this.appId}/treatment/run`, treatment);
  }

  onTreatmentChain(appId: number): Observable<TreatmentChain[]> {
    this.appId = appId;
    return this.socketClient.onMessage(`/topic/${appId}/treatment/update`);
  }

}
