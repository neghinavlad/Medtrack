import { Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PatientsViewComponent} from './patients/patients-view/patients-view.component';
import {DoctorsViewComponent} from './doctors/doctors-view/doctors-view.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'patients',
    component: PatientsViewComponent
  },
  {
    path: 'doctors',
    component: DoctorsViewComponent
  }
];
