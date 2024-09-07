import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountryData = createAsyncThunk("/country/content", async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/countries", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const countrySlice = createSlice({
  name: "country",
  initialState: {
    isLoading: false,
    countries: [],
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
    [getCountryData.pending]: (state) => {
      state.isLoading = true;
    },
    [getCountryData.fulfilled]: (state, action) => {
      state.countries = action.payload?.data;
      state.isLoading = false;
    },
    [getCountryData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default countrySlice.reducer;
