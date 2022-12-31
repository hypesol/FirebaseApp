import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ApiConstants from '../api/ApiConstants';
// import SavedMediaData from '../api/methods/User';
export interface UserState {
    books: any;
    // isLoggedIn: boolean;
}
const initialState: UserState = {
    // isLoggedIn: false,
    books: ""
};


export const savedMediaRequest: any = createAsyncThunk(
    'ThinkSpot/savedMediaRequest',
    async ({ id, current_user_id }) => {
        const dataFor = {
            id: id,
            current_user_id: current_user_id
        };
        const responseSavedMediaData = await SavedMediaData(dataFor);
        if (responseSavedMediaData?.success === true && responseSavedMediaData?.code === 200) {
            AsyncStorage.setItem('@token', responseSavedMediaData.token);
            return responseSavedMediaData;
        }
        else {
            return responseSavedMediaData
        }
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // [savedMediaRequest.fulfilled]: (state: UserState, action) => {
        builder.addCase(savedMediaRequest.fulfilled, (state: UserState, action) => {
            if (action?.payload?.status === 201 || action?.payload?.status === 202) {
                return action?.payload;
            } else if (
                action?.payload?.status == 200
            ) {
                // const data = action?.payload?.user;
                const stateData = {
                    ...state,
                    ...initialState,
                    books: action.payload.books,
                };
                return stateData;
            }
            return false;
        },
        )
    },
});

const { reducer } = userSlice;
export default reducer;
