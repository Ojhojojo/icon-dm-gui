export class Treatment {
  id: string;
  treatmentCode: string;
  treatmentName: string;
  treatmentOrder: number;
  enabled: boolean;
  chainId: number;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  lastRunBy?: string;
  lastRunDate?: Date;
  statusId: number;
}
