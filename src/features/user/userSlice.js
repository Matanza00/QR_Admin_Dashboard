import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



// export const getLeadsContent = createAsyncThunk('/leads/content', async () => {
// 	const response = await axios.get('/api/users?page=2', {})
// 	return response.data;
// })

export const userLogin = createAsyncThunk('/user/login', async (payload) => {
    const response = await axios.post('/auth/login', payload)
    return response.data;
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        user: null
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
        [userLogin.pending]: state => {
            state.isLoading = true
        },
        [userLogin.fulfilled]: (state, action) => {
            state.user = action.payload.data
            state.isLoading = false
        },
        [userLogin.rejected]: state => {
            state.isLoading = false
        },
    }
})

// export const { addNewLead, deleteLead } = userSlice.actions

export default userSlice.reducer