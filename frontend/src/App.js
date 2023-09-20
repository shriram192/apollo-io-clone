import React from 'react';
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
} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FilterTable from './components/FilterTable';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient()

function App() {

  const columns = React.useMemo(
    () => [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Title",
            accessor: "title"
          },
          {
            Header: "Company",
            accessor: "company"
          },
          // {
          //   Header: "Quick Actions",
          //   accessor: "quickActions"
          // },
          {
            Header: "Contact Location",
            accessor: "contactLocation"
          },
          {
            Header: "# Employees",
            accessor: "employee_no"
          }, 
          {
            Header: "Email",
            accessor: "email"
          },
          {
            Header: "Industry",
            accessor: "industry"
          },
          {
            Header: "Keywords",
            accessor: "keywords"
          }
    ],
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Flex w="100vw" h="90vh">
          <Sidebar />
          <FilterTable columns={columns} data={[]} />
        </Flex>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
