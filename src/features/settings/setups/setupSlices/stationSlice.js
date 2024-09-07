import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStationData = createAsyncThunk(
  "/stations/content",
  async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("/stations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const stationSlice = createSlice({
  name: "station",
  initialState: {
    isLoading: false,
    stations: [],
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
    [getStationData.pending]: (state) => {
      state.isLoading = true;
    },
    [getStationData.fulfilled]: (state, action) => {
      state.stations = action.payload?.data;
      state.isLoading = false;
    },
    [getStationData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default stationSlice.reducer;
