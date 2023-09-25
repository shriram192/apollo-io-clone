import React from "react";
import {
  Accordion,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import LocationAccordion from "./LocationAccordion";
import CompanyAccordion from "./CompanyAccordion";
import NameAccordion from "./NameAccordion";

export default function SearchPanel() {
  return (
    <>
      <InputGroup variant="flushed" size="lg">
        <InputLeftElement py={3} pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input py={3} variant="flushed" placeholder="Search People" />
      </InputGroup>
      <Text px={4} py={3} color="black" fontWeight="bolder">
        Filters
      </Text>
      <Divider />
      <Accordion allowMultiple size="lg">
        <NameAccordion />
        <CompanyAccordion />
        <LocationAccordion />
      </Accordion>
    </>
  );
}
