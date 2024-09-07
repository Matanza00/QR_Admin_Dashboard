import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBranchData = createAsyncThunk("/branch/content", async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/branches", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const branchSlice = createSlice({
  name: "branch",
  initialState: {
    isLoading: false,
    branches: [],
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
    [getBranchData.pending]: (state) => {
      state.isLoading = true;
    },
    [getBranchData.fulfilled]: (state, action) => {
      state.branches = action.payload?.data;
      state.isLoading = false;
    },
    [getBranchData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default branchSlice.reducer;
