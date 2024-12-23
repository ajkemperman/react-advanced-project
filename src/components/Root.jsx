import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { Footer } from "./Footer";

export const Root = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="100%">
      <Navigation />
      <Box flexGrow="1">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
