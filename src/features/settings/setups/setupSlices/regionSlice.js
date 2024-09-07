import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRegionData = createAsyncThunk("/regions/content", async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/regions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const regionSlice = createSlice({
  name: "region",
  initialState: {
    isLoading: false,
    regions: [],
  },
  reducers: {
    // addNewLead: (state, action) => {
    //     let {newLeadObj} = action.payload
    //     state.leads = [...state.leads, newLeadObj]
    // },
    // deleteLead: (state, action) => {
    //     let {index} = action.payload
    //     state.leads.splice(index, 1)
    // }
  },

  extraReducers: {
    [getRegionData.pending]: (state) => {
      state.isLoading = true;
    },
    [getRegionData.fulfilled]: (state, action) => {
      state.regions = action.payload?.data;
      state.isLoading = false;
    },
    [getRegionData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default regionSlice.reducer;
