import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import React, { useEffect } from "react";
import { useFilter } from "../store/filter";
import { getOrganizationTags } from "../data/queries";
import { useQuery } from "@tanstack/react-query";

export default function CompanyAccordion() {
  const setCompanyList = useFilter((state) => state.setCompanyList);
  const clearCompanyList = useFilter((state) => state.clearCompanyList);
  const removeCompanyList = useFilter((state) => state.removeCompanyList);

  const company_list = useFilter((state) => state.company_list);
  const companyOptions = useFilter((state) => state.companyOptions);

  const changeCompanyOptions = useFilter((state) => state.changeCompanyOptions);

  const companyData = useQuery(["company", ""], () => getOrganizationTags(""));

  useEffect(() => {
    if (companyData.isSuccess && !companyData.isLoading) {
      changeCompanyOptions(companyData.data);
    }
  }, [companyData]);

  const promiseCompany = async (inputValue, callback) => {
    if (inputValue == "") {
      callback([]);
    }
    const data = await getOrganizationTags(inputValue);
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
              Company
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <AsyncSelect
            size={"sm"}
            placeholder="Enter Companies..."
            isMulti
            isSearchable
            onChange={(value, event) => {
              if (event.action === "select-option") {
                for (let i = 0; i < value.length; i++) {
                  setCompanyList(value[i]);
                }
              } else if (event.action === "remove-value") {
                removeCompanyList(value);
              } else if (event.action === "clear") {
                clearCompanyList();
              }
            }}
            loadOptions={promiseCompany}
            value={company_list}
            defaultOptions={companyOptions}
            menuPortalTarget={document.body}
            menuPosition={"fixed"}
          />
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
