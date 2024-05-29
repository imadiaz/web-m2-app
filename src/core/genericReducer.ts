import { createSlice } from "@reduxjs/toolkit";

const initialState = { rowData: null, changeIndicator: 0 };
const genericSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setRowData: (state, action) => {
      state.rowData = action.payload;
    },
    incrementChangeIndicator: (state) => {
      state.changeIndicator += 1;
    },
    resetChangeIndicator: (state) => {
      state.changeIndicator = 0;
    },
    resetRowData: (state) => {
      state.rowData = null;
    },
  },
});

export const {
  setRowData,
  incrementChangeIndicator,
  resetChangeIndicator,
  resetRowData,
} = genericSlice.actions;

export default genericSlice.reducer;

export const selectCurrentRowData = (state: any) => state.data.rowData;
export const selectCurrentChangeIndicator = (state: any) =>
  state.data.changeIndicator;
