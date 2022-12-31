import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ApiConstants from '../api/ApiConstants';
// import loginUser from '../api/methods/Login';
// import { Alert } from 'native-base';


export interface IGuestSSO {
    email?: string;
    createLocally?: boolean;
    isGuest: boolean;
}
export interface IGuestSSOResponseState {
    type: string;
    response: IGuestSSO;
}
export interface UserState {
    language: string;
    data: Array<any>;
    activeTab: string;
    annotationDrawerOpen: boolean;
    annotationDrawerState: string;
    readerModeDark: boolean;
    readerFontSize: string;
    readerFontFamily: string;
    dataViewAnnotation: object;
    bookData: object;
}
const initialState: UserState = {
    data: [],
    language: 'en',
    activeTab: '',
    annotationDrawerOpen: false,
    annotationDrawerState: '',
    readerFontFamily: '',
    readerFontSize: 'small',
    readerModeDark: false,
    dataViewAnnotation: {},
    bookData: {},
};


export const doLogin: any = createAsyncThunk(
    'SeeBiz/Login',
    async ({ email, password }) => {
        const dataFor = {
            // st: st,
            email: email,
            password: password
        };
        const responseOfUserData = await loginUser(dataFor);
        if (responseOfUserData?.success === true && responseOfUserData?.code === 200) {
            AsyncStorage.setItem('@token', responseOfUserData.token);
            return responseOfUserData;
        }
        else {
            return responseOfUserData
        }
    }
);


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: {
        [doLogin.fulfilled]: (state: UserState, action) => {
            if (action?.payload?.code === 201 || action?.payload?.code === 202) {
                return action?.payload;
            } else if (
                action?.payload?.code == 200
            ) {
                const data = action?.payload?.user;
                // console.log("email", action)
                const stateData = {
                    ...state,
                    ...initialState,
                    email: action?.payload.user_data.email,
                    token: action?.payload.token,
                    user_data: action?.payload.user_data,
                    current_user_id: action?.payload.user_id,
                    isLoggedIn: true,
                };
                return stateData;
            }
            return false;
        },
    },
});

const { reducer } = appSlice;
export default reducer;
