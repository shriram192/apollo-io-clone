import { Flex, IconButton, Text, Select, useToast } from "@chakra-ui/react";
import React from "react";
import { useFilter } from "../store/filter";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function Pagination() {
  const page = useFilter((state) => state.page);
  const per_page = useFilter((state) => state.per_page);
  const total_rows = useFilter((state) => state.total_rows);
  const total_pages = useFilter((state) => state.total_pages);
  const setPage = useFilter((state) => state.setPage);

  const toast = useToast();

  const handlePageChange = (val) => {
    if (val > 1000) {
      toast({
        title: "You have reached maximum page number for account",
        position: "top-right",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setPage(val);
    }
  };

  return (
    <Flex
      h="5vh"
      w="80vw"
      color="gray"
      alignItems="center"
      justifyContent="center"
    >
      <Text>
        {per_page * (page - 1)
          ? per_page * (page - 1)
          : total_pages > 0
          ? 1
          : 0}{" "}
        - {per_page * page > total_rows ? total_rows : per_page * page} of{" "}
        {total_rows}
      </Text>
      <Flex mx={4}>
        <IconButton
          icon={<ChevronLeftIcon w="20px" h="20px" />}
          size="sm"
          bg="white"
          onClick={() => handlePageChange(page - 1)}
        />
        <Select
          w="5vw"
          size="sm"
          onChange={(e) => handlePageChange(parseInt(e.target.value))}
          value={page}
        >
          {Array.apply(null, {
            length: total_pages > 1000 ? 1000 : total_pages,
          }).map((e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <IconButton
          icon={<ChevronRightIcon w="20px" h="20px" />}
          size="sm"
          bg="white"
          onClick={() => handlePageChange(page + 1)}
        />
      </Flex>
    </Flex>
  );
}
