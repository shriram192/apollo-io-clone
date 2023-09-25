import { Flex, IconButton, Text, Select } from "@chakra-ui/react";
import React from "react";
import { useFilter } from "../store/filter";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

export default function Pagination() {
  const page = useFilter((state) => state.page);
  const per_page = useFilter((state) => state.per_page);
  const total_rows = useFilter((state) => state.total_rows);
  const total_pages = useFilter((state) => state.total_pages);

  const setPage = useFilter((state) => state.setPage);

  return (
    <Flex
      h="5vh"
      w="80vw"
      color="gray"
      alignItems="center"
      justifyContent="center"
    >
      <Text>
        {per_page * (page - 1) || 1} - {per_page * page} of {total_rows}
      </Text>
      <Flex mx={4}>
        <IconButton
          icon={<ChevronLeftIcon w="20px" h="20px" />}
          size="sm"
          bg="white"
          onClick={() => setPage(page - 1)}
        />
        <Select
          w="5vw"
          size="sm"
          onChange={(e) => setPage(e.target.value)}
          value={page}
        >
          {Array.apply(null, { length: 100 }).map((e, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <IconButton
          icon={<ChevronRightIcon w="20px" h="20px" />}
          size="sm"
          bg="white"
          onClick={() => setPage(page + 1)}
        />
      </Flex>
    </Flex>
  );
}
