export class Patient {
  id: number;
  lastName: string;
  firstName: string;
  age: number;
  condition: 'LIGHT' | 'MEDIUM' | 'BAD' | 'CRITICAL';  // Enum
  date_of_arrival: string;
  medical_record: string;

  constructor(patient?: Partial<Patient>) {
    this.id = patient?.id ?? 0;
    this.lastName = patient?.lastName ?? '';
    this.firstName = patient?.firstName ?? '';
    this.age = patient?.age ?? 0;
    this.condition = patient?.condition ?? 'LIGHT';
    this.date_of_arrival = patient?.date_of_arrival ?? new Date().toISOString();
    this.medical_record = patient?.medical_record ?? '';
  }
}
