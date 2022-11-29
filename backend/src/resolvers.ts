import { readDataFromCSV, transformPatientData } from './utils.js';

import {
    Clinic,
    Patient
} from './types.js'

const DATA_FILE_NAMES = {
    clinics: 'clinics.csv',
    patientsForClinic1: 'patients-1.csv',
    patientsForClinic2: 'patients-2.csv'
};

const getClinics = async (): Promise<Clinic[]> => {
    try {
        const records = await readDataFromCSV(DATA_FILE_NAMES.clinics);

        return records;
    } catch (e) {
        console.error(e);
    }

    return [];
};

const getSingleClinic = async (_parent, { clinicId }: { clinicId: Clinic['id'] }): Promise<Clinic> => {
    try {
        const clinics = await getClinics();
        const found = clinics.find(({ id }) => id === clinicId);

        return found || null;
    } catch (e) {
        console.error(e);
    }
}

const getClinicPatients = async (_parent, { clinicId, sortBy }: { clinicId: Clinic['id'], sortBy?: any }): Promise<Patient[]> => {
    try {
        let clinicFile = '';

        switch (clinicId) {
            case '1':
                clinicFile = DATA_FILE_NAMES.patientsForClinic1;
                break;
            case '2':
                clinicFile = DATA_FILE_NAMES.patientsForClinic2;
                break;
            default:
                throw new Error('Not found');
        }

        const rawRecords = await readDataFromCSV(clinicFile);
        const records = rawRecords.map(transformPatientData);

        if (sortBy) {
            const sortField = Object.keys(sortBy)[0];
            const sortDirection = sortBy[sortField];

            if (sortField === 'id') {
                const sortComparisons = {
                    ascending: (prev: Patient, next: Patient) => Number(prev.id) - Number(next.id),
                    descending: (prev: Patient, next: Patient) => Number(next.id) - Number(prev.id),
                };

                return records.sort(sortComparisons[sortDirection]);
            }

            if (sortField === 'dateOfBirth') {
                const sortComparisons = {
                    ascending: (prev: Patient, next: Patient) => new Date(prev.dateOfBirth).valueOf() - new Date(next.dateOfBirth).valueOf(),
                    descending: (prev: Patient, next: Patient) => new Date(next.dateOfBirth).valueOf() - new Date(prev.dateOfBirth).valueOf(),
                };

                return records.sort(sortComparisons[sortDirection]);
            }

            const sortComparisons = {
                ascending: (prev: Patient, next: Patient) => prev[sortField].localeCompare(next[sortField]),
                descending: (prev: Patient, next: Patient) => next[sortField].localeCompare(prev[sortField]),
            };

            return records.sort(sortComparisons[sortDirection])
        }

        return records;
    } catch (e) {
        console.error(e);
    }

    return [];
};

export const resolvers = {
    Query: {
        clinics: getClinics,
        clinic: getSingleClinic,
        patients: getClinicPatients
    },
    Patient: {
        async clinic(parent) {
            const clinics = await getClinics();
            return clinics.find(({ id }) => id === parent.clinicId);
        }
    },
    Clinic: {
        async patients(parent) {
            return await getClinicPatients(parent, { clinicId: parent.id });
        }
    }
};