import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSegmentData = createAsyncThunk("/segment/content", async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/segments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const segmentSlice = createSlice({
  name: "segment",
  initialState: {
    isLoading: false,
    segments: [],
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
    [getSegmentData.pending]: (state) => {
      state.isLoading = true;
    },
    [getSegmentData.fulfilled]: (state, action) => {
      state.segments = action.payload?.data;
      state.isLoading = false;
    },
    [getSegmentData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default segmentSlice.reducer;
