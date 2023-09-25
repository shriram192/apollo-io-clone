import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import SearchPanel from "./SearchPanel";

export default function Sidebar() {
  return (
    <Flex w="20vw" h="90vh" flexDir="column">
      <Tabs>
        <TabList px={3}>
          <Tab>Search</Tab>
          <Tab>Saved Searches</Tab>
        </TabList>
        <TabPanels p={0}>
          <TabPanel>
            <SearchPanel />
          </TabPanel>
          <TabPanel>
            <Flex alignItems="center" justifyContent="center">
              <Text>Coming Soon.</Text>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
