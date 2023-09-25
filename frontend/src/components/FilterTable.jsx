import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { useFilter } from "../store/filter";
import { useQuery } from "@tanstack/react-query";
import { searchPeople } from "../data/queries";
import Pagination from "./Pagination";

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
  const per_page = useFilter((state) => state.per_page);

  const searchData = useQuery(["search", name, locations, companies], () =>
    searchPeople(name, locations, companies)
  );

  useEffect(() => {
    console.log("Name: ", name);
    console.log("Locations: ", locations);
    console.log("Companies: ", companies);
    console.log("Search Data: ", searchData);
  }, [name, locations, companies, searchData]);

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
                return (
                  <Th position="sticky" top="0" bg={"white"} w="15vw">
                    {item}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {searchData.isLoading
              ? Array.apply(null, { length: per_page }).map((e, i) => (
                  <Skeleton w="80vw" h="5vh" margin={3} />
                ))
              : searchData.isSuccess &&
                searchData.data.success &&
                searchData.data.data.map((row, i) => {
                  return (
                    <Tr key={row.id}>
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
        <Pagination />
      </>
    </Flex>
  );
}
