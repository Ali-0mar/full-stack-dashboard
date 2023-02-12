import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mode: 'dark',
    user: '63701cc1f03239c72c00017f'
};

export const globalState = createSlice({
    name:  'global',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        }
    }
});

export const { setMode } = globalState.actions;

export default globalState.reducer;