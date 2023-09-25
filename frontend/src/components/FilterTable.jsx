import React, { useEffect } from "react";
import { useTable, usePagination } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { useFilter } from "../store/filter";
import { useQuery } from "@tanstack/react-query";
import { searchPeople } from "../data/queries";

export default function FilterTable() {
  const columns = React.useMemo(
    () => [
      "Name",
      "Title",
      "Company",
      "Contact Location",
      "# Employees",
      "Email",
      "Industry",
      "Keywords",
    ],
    []
  );

  const name = useFilter((state) => state.name);
  const locations = useFilter((state) => state.location_list);
  const companies = useFilter((state) => state.company_list);
  const searchData = useQuery(["search", name, locations, companies], () =>
    searchPeople(name, locations, companies)
  );

  useEffect(() => {
    console.log("Name: ", name);
    console.log("Locations: ", locations);
    console.log("Companies: ", companies);
    console.log("Search Data: ", searchData);
  }, [name, locations, companies]);

  return (
    <Flex w="80vw" h="85vh" bg={"gray.100"} flexDir="column" overflowX="scroll">
      <>
        <Table
          style={{ tableLayout: "fixed" }}
          w="80vw"
          bg={"white"}
          overflowX="scroll"
        >
          <Thead>
            <Tr>
              {columns.map((item) => {
                return <Th w="15vw">{item}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {searchData.isSuccess &&
              searchData.data.success &&
              searchData.data.data.map((row, i) => {
                return (
                  <Tr key={i}>
                    <Td>{row.name}</Td>
                    <Td>{row.title}</Td>
                    <Td>{row.company}</Td>
                    <Td>{row.contactLocation}</Td>
                    <Td>{row.employee_no}</Td>
                    <Td>{row.email}</Td>
                    <Td>{row.industry}</Td>
                    <Td>{row.keywords}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </>
    </Flex>
  );
}
