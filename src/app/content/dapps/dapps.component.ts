import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dapps',
  templateUrl: './dapps.component.html',
  styleUrls: ['./dapps.component.css']
})
export class DappsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openNewTab(url: string) {
    window.open(url, '_blank');
  }
}
