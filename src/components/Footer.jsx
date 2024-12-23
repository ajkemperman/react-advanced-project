import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as="footer" bg="blue.200" width="100%" py={4} textAlign="center">
      <Text fontSize="sm" color="gray.800" fontWeight="normal">
        © {new Date().getFullYear()} A.J. Kemperman
      </Text>
    </Box>
  );
};
