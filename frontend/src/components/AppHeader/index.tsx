import { Image, Box, Heading } from "@chakra-ui/react";
import logo from "../../logo.svg";

export const AppHeader = () => (
  <header>
    <Box bg="#eaeaea" borderBottom="1px" padding="10px">
      <Image
        height="50px"
        marginRight="15px"
        src={logo}
        title="Patients dashboard logo"
        display="inline-block"
        verticalAlign="middle"
      />{" "}
      <Heading display="inline-block" fontWeight="light" verticalAlign="middle">
        Patients dashboard 3000
      </Heading>
    </Box>
  </header>
);
