import { createSlice } from "@reduxjs/toolkit";

const initialState = { rowData: null, companyUpdatedIndicator: false, siteUpdatedIndicator: false };
const genericSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRowData: (state, action) => {
      state.rowData = action.payload;
    },
    resetRowData: (state) => {
      state.rowData = null;
    },
    setCompanyUpdatedIndicator: (state) => {
      state.companyUpdatedIndicator = true;
    },
    resetCompanyUpdatedIndicator: (state) => {
      state.companyUpdatedIndicator = false;
    },
    setSiteUpdatedIndicator: (state) => {
      state.siteUpdatedIndicator = true
    },
    resetSiteUpdatedIndicator: (state) => {
      state.siteUpdatedIndicator = false
    }
  },
});

export const {
  setRowData,
  resetRowData,
  setCompanyUpdatedIndicator,
  resetCompanyUpdatedIndicator,
  setSiteUpdatedIndicator,
  resetSiteUpdatedIndicator
} = genericSlice.actions;

export default genericSlice.reducer;

export const selectCurrentRowData = (state: any) => state.data.rowData;
export const selectCurrentStateOfSiteUpdatedIndicator = (state: any) => state.data.siteUpdatedIndicator
export const selectCurrentStateOfCompanyUpdatedIndicator = (state: any) => state.data.companyUpdatedIndicator
