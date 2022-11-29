import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Skeleton,
} from "@chakra-ui/react";

export interface SkeletonTableProps {
  headers: string[];
  numberOfRows?: number;
}

interface EmptyRowProps {
  headers: SkeletonTableProps["headers"];
}

const EmptyRow = ({ headers }: EmptyRowProps) => (
  <Tr>
    {headers.map((text) => (
      <Td key={`row_item_${text}`}>
        <Skeleton height="20px" />
      </Td>
    ))}
  </Tr>
);

export const SkeletonTable = ({
  headers,
  numberOfRows = 5,
}: SkeletonTableProps) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Patients</TableCaption>
        <Thead>
          <Tr>
            {headers.map((text) => (
              <Th key={text}>{text}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Array(numberOfRows)
            .fill(null)
            .map((_, i) => (
              <EmptyRow headers={headers} key={`row_${i}`} />
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
