import { Routes } from '@angular/router';
import {PatientsViewComponent} from './patients/patients-view/patients-view.component';
import {DashboardComponent} from './dasboard/dashboard.component';
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
