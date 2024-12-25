import {createAsyncThunk} from "@reduxjs/toolkit";
import {Links} from "../types.ts";
import axiosApi from "../axiosApi.ts";

export const sendLink = createAsyncThunk<Links, string>(
    'links/sendLink',
    async (link) => {
       const response = await axiosApi.post('/links', {originalUrl: link})
        return response.data
    }
);
