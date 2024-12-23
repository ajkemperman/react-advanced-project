import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Text } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box as="nav" bg="blue.500" color="white" p={4} boxShadow="sm">
      <Flex
        justifyContent="center"
        alignContent="center"
        maxW="1200px"
        mx="auto"
      >
        <Link to="/">
          <Box
            as="span"
            color="white"
            _hover={{ color: "blue.200", textDecoration: "underline" }}
          >
            <Text fontSize={20}>Back to list of events</Text>
          </Box>
        </Link>
      </Flex>
    </Box>
  );
};
