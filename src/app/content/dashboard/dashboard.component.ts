import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  displayedColumns = ['app', 'activity', 'timestamp'];
  block: string;
  activityData: ActivityModel[] = [];
  dataSource = new MatTableDataSource(this.activityData);
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  private unsubscribeSubject: Subject<void> = new Subject<void>();

  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.service.get('/data').subscribe(data => {
      this.block = data.block;
      data.activityModelList.forEach(element => {
        this.addElement(element);
      });
      this.dataSource = new MatTableDataSource(this.activityData);
      this.subscribeToLiveData();
    });
  }

  subscribeToLiveData() {
    this.service.onBlockUpdate().pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(data => {
        this.block = data.block;
      });

    this.service.onActivityUpdate().pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(data => {
        if (data) {
          data.forEach(element => {
            this.addElement(element);
          });
          this.dataSource = new MatTableDataSource(this.activityData);
        }
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addElement(element: ActivityModel) {
    this.activityData.unshift(element);
    if (this.activityData.length > 10000) {
      this.activityData.pop();
    }
  }

  getAppImageSource(app: string) {
    return '../../../assets/icons/' + app.toLowerCase() + '.svg';
  }

  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openNewTab(transactionHash: string) {
    window.open('https://tracker.icon.foundation/transaction/' + transactionHash, '_blank');
  }
}

export interface ActivityModel {
  app: string;
  activity: string;
  timestamp: Date;
  transactionHash: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

