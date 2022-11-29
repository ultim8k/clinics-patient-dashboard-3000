import { gql, useQuery } from "@apollo/client";
import {
  Flex,
  Spinner,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { Clinic } from "../../types";
import { Patients } from "../Patients";

const GET_CLINICS = gql`
  query GetClinics {
    clinics {
      id
      name
    }
  }
`;

export const ClinicsPanel = () => {
  const { loading, error, data } = useQuery(GET_CLINICS);

  if (error || (!loading && !data)) {
    return (
      <Flex alignItems="center" justifyContent="center">
        Error loading clinics' data.
      </Flex>
    );
  }

  if (loading) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const { clinics = [] } = data;

  return (
    <Tabs>
      <TabList>
        {clinics.map(({ name, id }: Clinic) => (
          <Tab key={`clinic_${id}`}>{name}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {clinics.map(({ id, name }: Clinic) => (
          <TabPanel key={`panel_clinic_${id}`}>
            <Patients clinicId={id} clinicName={name} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
