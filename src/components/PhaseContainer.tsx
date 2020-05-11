import React from "react";
import { Box } from "@nulogy/components";

export const PhaseContainer = ({ children }: any) => (
  <Box border="1px solid blue" minHeight="600px" p="x1" m="x1">
    {children}
  </Box>
);
