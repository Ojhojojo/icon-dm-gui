import { Treatment } from './treatment.model';

export class TreatmentChain {
  id: number;
  chainCode: string;
  chainName: string;
  appId: number;
  treatments: Treatment[];
}
