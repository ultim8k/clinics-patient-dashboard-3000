import { Box, Center, Link, Text } from "@chakra-ui/react";

export const AppFooter = () => (
  <Center bg="white" padding="10px" zIndex="100" borderTop="1px">
    <Box>
      Made with{" "}
      <Text display="inline" color="#ce2029">
        ♥
      </Text>{" "}
      by{" "}
      <Link
        href="https://kostas.rocks"
        target="_blank"
        rel="noopener noreferrer"
        isExternal
      >
        Kostas
      </Link>
    </Box>
  </Center>
);
