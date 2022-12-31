import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ApiConstants from '../api/ApiConstants';
// import loginUser from '../api/methods/Login';
// import { Alert } from 'native-base';
// import { enableSnackBar } from './snackBarSlice';
// import { CallServiceFor } from '../services/call_service_for';
// import { UserState } from '../models/reducers/user';
// import ApiConfig from '../config/api-config';

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
  isLoggedIn: boolean;
  id: number;
  username: string;
  password: string;
  token?: string;
  email: string;
  user_data: {};
  current_user_id: any,
}
const initialState: UserState = {
  isLoggedIn: false,
  id: -1,
  username: '',
  password: '',
  token: '',
  email: '',
  user_data: {},
  current_user_id: 0
};

export const getUserData = createAsyncThunk(
  'SeeBiz/userData',
  async ({ email }) => {
    // console.log('Callign Service Login Service userData loginSlice.js ', email);
    // const urlFor = ApiConfig.BASE_URL + ApiConfig.USER_DATA;
    const keyFor = { email };
    // const response = await CallServiceFor(urlFor, 'post', keyFor);
    // return response.data;
  },
);
export const doLogin: any = createAsyncThunk(
  'SeeBiz/Login',
  async ({ email, password }) => {
    const dataFor = {
      // st: st,
      email: email,
      password: password
    };
    console.log("Data 1", dataFor);
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
export const doLogout: any = createAsyncThunk('SeeBiz/Logout', async () => {
  return true;
  //return {email, password};
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [doLogin.fulfilled]: (state: UserState, action) => {

      if (action?.payload?.code === 201 || action?.payload?.code === 202) {
        return action?.payload;
      } else if (
        // action?.payload?.code !== 201 &&
        // action?.payload !== undefined &&
        // action?.payload != ''
        action?.payload?.code == 200
      ) {
        const data = action?.payload?.user;
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
      //state.push(action.payload);
    },
    [doLogout.fulfilled]: (state: UserState, action) => {
      console.log('Inside Logout Function---');

      return {
        ...state,
        isLoggedIn: false,
        _id: 0,
        token: '',
        address: {},
        api_key: '',
        businessTypeName: '',
        business_info: [],
        business_name: '',
        companyDescription: '',
        created_at: '',
        email: '',
        emailChange: {},
        email_settings: {},
        email_verification: false,
        first_name: '',
        followers: [],
        followings: [],
        homeOnboarding: false,
        images: {},
        isTrashed: false,
        isTrusted: false,
        last_name: '',
        location: '',
        logins: [],
        metaTags: {},
        phone: {},
        phone_number_verification: false,
        profileCompletion: '0',
        profileOnboarding: false,
        shortlists: [],
        signup_type: 'buyer',
        status: {},
        subscribe_to_posts: false,
        topVendor: false,
        unique_url: '',
        updated_at: '',
        user_type: 'general',
        username: '',
        usernameChange: {},
        website: '',
        wholeSaleMember: false,
      };
    },
  },
});

const { reducer } = authSlice;
export default reducer;
