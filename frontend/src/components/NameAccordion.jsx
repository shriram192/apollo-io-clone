import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useFilter } from "../store/filter";

export default function NameAccordion() {
  const setName = useFilter((state) => state.setName);
  const name = useFilter((state) => state.name);

  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight="bold"
              color={"black"}
            >
              Name
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Input
            py={3}
            size="sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name...."
          />
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
