import React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
} from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FilterTable from "./components/FilterTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Flex w="100vw" h="90vh">
          <Sidebar />
          <FilterTable />
        </Flex>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
