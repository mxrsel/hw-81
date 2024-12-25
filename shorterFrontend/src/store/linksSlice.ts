import {createSlice} from "@reduxjs/toolkit";
import {Links} from "../types.ts";
import {sendLink} from "./linksThunk.ts";

interface linksSliceState {
    link: Links | null
    isLoading: boolean
    isError: boolean
}

const initialState: linksSliceState = {
    link: null,
    isLoading: false,
    isError: false
}

const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                sendLink.pending, (state) => {
                    state.isLoading = true
                    state.isError = false
                }
            )
            .addCase(
                sendLink.fulfilled, (state, action) => {
                    state.isLoading = false
                    state.link = action.payload;
                }
            )
            .addCase(
            sendLink.rejected, (state) => {
                state.isLoading = false
                    state.isError = true
                }
            )
    }
})

export const linksReducer = linksSlice.reducer