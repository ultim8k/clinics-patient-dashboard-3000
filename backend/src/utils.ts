import { readFile } from 'node:fs/promises';
import * as path from "path";

import { parse } from 'csv-parse/sync';
import { Patient, RawPatient } from './types';

const DATA_DIR_PATH = './data';

export const readDataFromCSV = async (fileName: string): Promise<any[]> => {
    try {
        const filePath = path.resolve(`${DATA_DIR_PATH}/${fileName}`);
        const unParsedData = await readFile(filePath, { encoding: 'utf-8' });

        const records = parse(unParsedData, {
            delimiter: ',',
            columns: true,
            skip_empty_lines: true
        });

        return records || [];
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const transformPatientData = ({
    id,
    clinic_id,
    first_name,
    last_name,
    date_of_birth
}: RawPatient): Patient => ({
    id,
    clinicId: clinic_id,
    firstName: first_name,
    lastName: last_name,
    dateOfBirth: date_of_birth
});
