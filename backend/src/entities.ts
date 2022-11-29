export const entities = `#graphql
    type Clinic {
        id: ID!
        name: String!
        patients: [Patient]!
    }

    type Patient {
        id: ID!
        clinic: Clinic!
        firstName: String!
        lastName: String!
        dateOfBirth: Date!
    }

    enum SortDirection {
        ascending
        descending
    }

    input SortByInput {
        id: SortDirection
        firstName: SortDirection
        lastName: SortDirection
        dateOfBirth: SortDirection
    }

    type Query {
        clinic(clinicId: ID!): Clinic
        clinics: [Clinic]!
        patients(clinicId: ID!, sortBy: SortByInput): [Patient]!
    }
`;
