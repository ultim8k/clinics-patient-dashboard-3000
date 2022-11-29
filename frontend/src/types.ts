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

export type SortColumn = "id" | "firstName" | "lastName" | "dateOfBirth";
export type SortDirection = "ascending" | "descending";
