export class Patient {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  condition: string;
  date_of_arrival: string;
  medical_record: string;
  isAssigned: boolean;
  assignedDoctorId?: number | null;

  constructor(patient: any) {
    this.id = patient?.id || 0;
    this.firstName = patient?.firstName || '';
    this.lastName = patient?.lastName || '';
    this.age = patient?.age || 0;
    this.condition = patient?.condition || 'LIGHT'; // Default to LIGHT condition
    this.date_of_arrival = patient?.date_of_arrival || new Date().toISOString();
    this.medical_record = patient?.medical_record || '';
    this.isAssigned = patient?.isAssigned ?? false; // Default to false
    this.assignedDoctorId = patient?.assignedDoctorId ?? null; // Default to null (no doctor assigned)
  }
}
