import { Flex } from "@chakra-ui/react";

import { AppHeader } from "./components/AppHeader";
import { AppFooter } from "./components/AppFooter";
import { ClinicsPanel } from "./components/ClinicsPanel";

const App = () => (
  <div>
    <Flex
      direction="column"
      justifyContent="space-between"
      height="100vh"
      maxHeight="100vh"
    >
      <AppHeader />
      <ClinicsPanel />
      <AppFooter />
    </Flex>
  </div>
);

export default App;
