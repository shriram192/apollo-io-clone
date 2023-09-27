import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import React, { useEffect } from "react";
import { getLocationTags } from "../data/queries";
import { useFilter } from "../store/filter";
import { useQuery } from "@tanstack/react-query";

export default function LocationAccordion() {
  const location_list = useFilter((state) => state.location_list);
  const removeLocationList = useFilter((state) => state.removeLocationList);
  const clearLocationList = useFilter((state) => state.clearLocationList);
  const setLocationList = useFilter((state) => state.setLocationList);
  const locationOptions = useFilter((state) => state.locationOptions);
  const setPage = useFilter((state) => state.setPage);

  const locationData = useQuery(["location", ""], () => getLocationTags(""));
  const changeLocationOptions = useFilter(
    (state) => state.changeLocationOptions
  );

  useEffect(() => {
    if (locationData.isSuccess && !locationData.isLoading) {
      changeLocationOptions(locationData.data);
    }
  }, [locationData, changeLocationOptions]);

  useEffect(() => {
    setPage(1);
  }, [location_list]);

  const promiseLocations = async (inputValue, callback) => {
    if (inputValue === "") {
      callback([]);
    }
    const data = await getLocationTags(inputValue);
    if (data.success) {
      callback(data.data);
    }
  };

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
              Location
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} overflow="auto">
          <AsyncSelect
            size={"sm"}
            placeholder="Enter Location...."
            isMulti
            isSearchable
            onChange={(value, event) => {
              if (event.action === "select-option") {
                for (let i = 0; i < value.length; i++) {
                  setLocationList(value[i]);
                }
              } else if (event.action === "remove-value") {
                removeLocationList(value);
              } else if (event.action === "clear") {
                clearLocationList();
              }
            }}
            loadOptions={promiseLocations}
            value={location_list}
            defaultOptions={locationOptions}
            menuPortalTarget={document.body}
            menuPosition={"fixed"}
          />
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
