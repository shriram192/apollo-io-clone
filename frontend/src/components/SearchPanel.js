import React from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Flex, Input, InputGroup, InputLeftElement, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import {
    AsyncCreatableSelect,
    AsyncSelect,
    CreatableSelect,
    Select,
  } from "chakra-react-select";


const companyOptions = [
    {label: "Google", value: "Google"},
    {label: "Microsoft", value: "Microsoft"},
    {label: "Apple", value: "Apple"},
    {label: "Netflix", value: "Netflix"},
]

const locationOptions = [
    {label: "United States", value: "United States"},
    {label: "India", value: "India"},
    {label: "Africa", value: "Africa"},
    {label: "China", value: "China"},
]

export default function SearchPanel() {
  return (
    <>
        <InputGroup variant="flushed" size="lg">
            <InputLeftElement py={3} pointerEvents='none'>
            <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input py={3} variant="flushed" placeholder='Search People' />
        </InputGroup>
        <Text px={4} py={3} color="black" fontWeight="bolder">Filters</Text>
        <Divider />
    <Accordion allowMultiple size="lg">
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left' fontWeight="bold" color={"black"}>
                        Name
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Input py={3} size="sm" placeholder='Enter Name....' />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left' fontWeight="bold" color={"black"}>
                        Company
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <AsyncSelect size={"sm"} placeholder='Enter Companies...' isMulti defaultOptions={companyOptions} menuPortalTarget={document.body}
    menuPosition={'fixed'}  />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left' fontWeight="bold" color={"black"}>
                        Location
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} overflow="auto">
                    <AsyncSelect size={"sm"} placeholder='Enter Location....' isMulti defaultOptions={locationOptions} menuPortalTarget={document.body}
    menuPosition={'fixed'}  />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    </>
  )
}
