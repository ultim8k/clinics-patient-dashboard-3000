export interface RawPatient {
    id: string;
    clinic_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
}

export interface Clinic {
    id: string;
    name: string;
}

export interface Patient {
    id: string;
    clinicId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}
