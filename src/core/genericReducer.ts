import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rowData: null,
  indicators: {
    company: { updated: false },
    site: { updated: false },
    priority: { updated: false },
    cardType: {updated: false}
  },
};
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
      state.indicators.company.updated = true;
    },
    resetCompanyUpdatedIndicator: (state) => {
      state.indicators.company.updated = false;
    },
    setSiteUpdatedIndicator: (state) => {
      state.indicators.site.updated = true;
    },
    resetSiteUpdatedIndicator: (state) => {
      state.indicators.site.updated = false;
    },
    setPriorityUpdatedIndicator: (state) => {
      state.indicators.priority.updated = true;
    },
    resetPriorityUpdatedIndicator: (state) => {
      state.indicators.priority.updated = false;
    },
    setCardTypeUpdatedIndicator: (state) => {
      state.indicators.cardType.updated = true;
    },
    resetCardTypeUpdatedIndicator: (state) => {
      state.indicators.cardType.updated = false;
    },
  },
});

export const {
  setRowData,
  resetRowData,
  setCompanyUpdatedIndicator,
  resetCompanyUpdatedIndicator,
  setSiteUpdatedIndicator,
  resetSiteUpdatedIndicator,
  setPriorityUpdatedIndicator,
  resetPriorityUpdatedIndicator,
  setCardTypeUpdatedIndicator,
  resetCardTypeUpdatedIndicator
} = genericSlice.actions;

export default genericSlice.reducer;

export const selectCurrentRowData = (state: any) => state.data.rowData;
export const selectSiteUpdatedIndicator = (state: any) =>
  state.data.indicators.site.updated;
export const selectCompanyUpdatedIndicator = (state: any) =>
  state.data.indicators.company.updated;
export const selectPriorityUpdatedIndicator = (state: any) =>
  state.data.indicators.priority.updated;
export const selectCardTypeUpdatedIndicator = (state: any) =>
  state.data.indicators.cardType.updated;
