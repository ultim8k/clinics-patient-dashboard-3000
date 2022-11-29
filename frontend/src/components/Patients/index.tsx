import { useState } from "react";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
} from "@chakra-ui/react";

import { useQuery, gql } from "@apollo/client";
import { SkeletonTable } from "./SkeletonTable";
import { Clinic, Patient, SortColumn, SortDirection } from "../../types";
import { SortIcon } from "./SortIcon";

const tableHeaders = ["ID", "First name", "Last name", "Date of Birth"];

const GET_PATIENTS = gql`
  query GetPatients($clinicId: ID!, $sortBy: SortByInput) {
    patients(clinicId: $clinicId, sortBy: $sortBy) {
      id
      firstName
      lastName
      dateOfBirth
    }
  }
`;

export interface PatientsProps {
  clinicId: Clinic["id"];
  clinicName: Clinic["name"];
}

export const Patients = ({ clinicId, clinicName }: PatientsProps) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>();
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("ascending");

  const { loading, error, data } = useQuery(GET_PATIENTS, {
    variables: {
      clinicId,
      ...(sortColumn
        ? {
            sortBy: {
              [sortColumn]: sortDirection,
            },
          }
        : {}),
    },
    nextFetchPolicy: "no-cache",
  });

  if (error) {
    return (
      <Box>
        There was an error while fetching patients.
        <br />
        Please come again later;
      </Box>
    );
  }

  if (loading) {
    return <SkeletonTable headers={tableHeaders} numberOfRows={100} />;
  }

  const { patients = [] } = data || {};

  const createColumnHeadClickHandler = (columnDataSlug: SortColumn) => () => {
    if (sortColumn === columnDataSlug) {
      if (sortDirection === "ascending") {
        setSortDirection("descending");
      } else {
        setSortDirection("ascending");
      }
    }

    setSortColumn(columnDataSlug);
  };

  return (
    <TableContainer
      height="100vh"
      maxHeight="calc(100vh - 215px)"
      overflowY="scroll"
    >
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Patients of {clinicName}</TableCaption>
        <Thead bgColor="white" position="sticky" top={0}>
          <Tr>
            <Th cursor="pointer" onClick={createColumnHeadClickHandler("id")}>
              ID
              {sortColumn === "id" && (
                <SortIcon sortDirection={sortDirection} />
              )}
            </Th>
            <Th
              cursor="pointer"
              onClick={createColumnHeadClickHandler("firstName")}
            >
              First name{" "}
              {sortColumn === "firstName" && (
                <SortIcon sortDirection={sortDirection} />
              )}
            </Th>
            <Th
              cursor="pointer"
              onClick={createColumnHeadClickHandler("lastName")}
            >
              Last name{" "}
              {sortColumn === "lastName" && (
                <SortIcon sortDirection={sortDirection} />
              )}
            </Th>
            <Th
              cursor="pointer"
              onClick={createColumnHeadClickHandler("dateOfBirth")}
            >
              Date of Birth{" "}
              {sortColumn === "dateOfBirth" && (
                <SortIcon sortDirection={sortDirection} />
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {patients.map(({ id, firstName, lastName, dateOfBirth }: Patient) => (
            <Tr key={`clinic_${clinicId}+patient_${id}`}>
              <Td>{id}</Td>
              <Td>{firstName}</Td>
              <Td>{lastName}</Td>
              <Td>{dateOfBirth}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
