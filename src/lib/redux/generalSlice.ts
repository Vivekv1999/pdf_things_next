import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface generalState {
    alredyMergePdf: any;
}

const initialState: generalState = {
    alredyMergePdf: [],
};

const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers: {
        setAlredyMergePdf: (state, action) => {
            state.alredyMergePdf = action.payload
        },
       resetGeneral: () => initialState,
    },
});

export const { setAlredyMergePdf,resetGeneral } = generalSlice.actions;
export default generalSlice.reducer;
