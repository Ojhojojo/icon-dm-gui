import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Treatment } from 'src/app/shared/models/treatment.model';
import { Observable } from 'rxjs';
import { TreatmentChain } from 'src/app/shared/models/treatment-chain.model';
import { BaseService } from './http/base.service';
import { SocketClientService } from './websocket/socket-client.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  constructor(protected http: HttpClient, private socketClient: SocketClientService) {
    super(http, 'dashboard');
  }

  onBlockUpdate(): Observable<any> {
    return this.socketClient.onMessage(`/topic/block`);
  }

  onActivityUpdate(): Observable<any> {
    return this.socketClient.onMessage(`/topic/activity`);
  }

}
