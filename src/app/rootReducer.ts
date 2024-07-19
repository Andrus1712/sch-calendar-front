import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '@/features/counter/counterSlice.ts';
import alertReducer from '@/features/alert/alertSlice.ts';
import { persistReducer } from 'redux-persist';
import authenticateReducer from '@/features/auth/authenticateSlice.ts';
import { api } from '@/services/api.ts';
import { default as storage } from 'redux-persist/es/storage';

/*const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
};*/

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['userData', 'isAuthenticated', 'status'],
};

const rootReducer = combineReducers({
    counter: counterReducer,
    alert: alertReducer,
    authenticate: persistReducer(authPersistConfig, authenticateReducer),
    [api.reducerPath]: api.reducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);


export default rootReducer;