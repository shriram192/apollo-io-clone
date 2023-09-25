import { create } from "zustand";

export const useFilter = create((set) => ({
  name: "",
  page: 0,
  per_page: 10,
  location_list: [],
  company_list: [],

  locationOptions: [],
  companyOptions: [],

  changeLocationOptions: (newValue) =>
    set((state) => {
      console.log("Location tags: ", newValue);
      if (newValue.success) {
        return { ...state, locationOptions: newValue.data };
      }
      return state;
    }),

  changeCompanyOptions: (newValue) =>
    set((state) => {
      console.log("Company tags: ", newValue);
      if (newValue.success) {
        return {
          ...state,
          companyOptions: newValue.data,
        };
      }
      return state;
    }),

  clearState: () =>
    set({
      name: "",
      location: "",
      company: "",
      locationOptions: [],
      companyOptions: [],
      location_list: [],
      company_list: [],
    }),

  setName: (newValue) => set((state) => ({ ...state, name: newValue })),
  setPerPage: (newValue) => set((state) => ({ ...state, per_page: newValue })),
  setPage: (newValue) => set((state) => ({ ...state, page: newValue })),

  setLocationList: (newValue) =>
    set((state) => {
      if (!state.location_list.some((item) => item.value === newValue.value)) {
        return { ...state, location_list: [...state.location_list, newValue] };
      }
      return state;
    }),

  removeLocationList: (newValue) =>
    set((state) => ({
      ...state,
      location_list: newValue,
    })),

  clearLocationList: () => set((state) => ({ ...state, location_list: [] })),

  setCompanyList: (newValue) =>
    set((state) => {
      if (!state.company_list.some((item) => item.value === newValue.value)) {
        return { ...state, company_list: [...state.company_list, newValue] };
      }
      return state;
    }),

  removeCompanyList: (newValue) =>
    set((state) => ({
      ...state,
      company_list: newValue,
    })),

  clearCompanyList: () =>
    set((state) => ({
      ...state,
      company_list: [],
    })),
}));
