import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rowData: null,
  indicators: {
    company: { updated: false },
    site: { updated: false },
    priority: { updated: false },
    cardType: { updated: false },
    level: { created: false },
    preclassifier: {updated: false}
  },
  siteId: 0,
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
    setSiteId: (state, action) => {
      state.siteId = action.payload;
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
    setLevelCreatedIndicator: (state) => {
      state.indicators.level.created = true;
    },
    resetLevelCreatedIndicator: (state) => {
      state.indicators.level.created = false;
    },
    setPreclassifierUpdatedIndicator: (state) => {
      state.indicators.preclassifier.updated = true;
    },
    resetPreclassifierUpdatedIndicator: (state) => {
      state.indicators.preclassifier.updated = false;
    },
  },
});

export const {
  setRowData,
  resetRowData,
  setSiteId,
  setCompanyUpdatedIndicator,
  resetCompanyUpdatedIndicator,
  setSiteUpdatedIndicator,
  resetSiteUpdatedIndicator,
  setPriorityUpdatedIndicator,
  resetPriorityUpdatedIndicator,
  setCardTypeUpdatedIndicator,
  resetCardTypeUpdatedIndicator,
  setLevelCreatedIndicator,
  resetLevelCreatedIndicator,
  setPreclassifierUpdatedIndicator,
  resetPreclassifierUpdatedIndicator
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
export const selectLevelCreatedIndicator = (state: any) =>
  state.data.indicators.level.created;
export const selectPreclassifierUpdatedIndicator = (state: any) =>
  state.data.indicators.preclassifier.updated;
export const selectSiteId = (state: any) => state.data.siteId;
