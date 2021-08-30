import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DappsComponent } from './content/dapps/dapps.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dapps', component: DappsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
