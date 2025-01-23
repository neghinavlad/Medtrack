import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EndpointList} from '../endpoints';
import {Patient} from './patients.model';


@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}


  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(EndpointList.patients());
  }


  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(EndpointList.patients(id));
  }


  createPatient(PatientData: FormData): Observable<Patient> {
    return this.http.post<Patient>(EndpointList.patients(), PatientData);
  }

  updatePatient(id: number, PatientData: FormData): Observable<Patient> {
    return this.http.patch<Patient>(EndpointList.patients(id), PatientData);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(EndpointList.patients(id));
  }

}
