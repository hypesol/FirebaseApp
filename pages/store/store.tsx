// PERSIST

import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import sliceReducer from './counterSlice';
import loginReducer from './authSlice';
// import ssoReducer from './ssoSlice';
// import loaderSlice from './loaderSlice';
// import snackBarSlices from './snackBarSlice';
import appReducer from './appSlice';
import userReducer from './userSlice';
import userSlice from "./userSlice2";


// import storage from 'redux-persist/lib/storage';
// import {combineReducers} from 'redux';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   blacklist: ["loading"]
// };

// // Imports: Redux Root Reducer
// import rootReducer from "../reducers/index";
// // Imports: Redux Root Saga
// import rootSaga from "../saga/index";
// // Middleware: Redux Saga
// const sagaMiddleware = createSagaMiddleware();
// //persist
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Redux: Store
// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// let persistor = persistStore(store);
// // Middleware: Redux Saga
// sagaMiddleware.run(rootSaga);
// // Exports
// export { store, persistor };




const rootReducer = combineReducers({
  auth: loginReducer,
  app: appReducer,
  book: userReducer,
  user: userSlice,
});


// loading: loadingReducer,
// auth: AuthReducer,
// snackbar: snackbarReducer,
// app: appReducer,
// book: userReducer,

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);
