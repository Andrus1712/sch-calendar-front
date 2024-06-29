import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/store/slice/counter.slice.ts';
import authenticateReducer from '@/store/slice/authenticate.slice.ts';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { default as storage } from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk'; // defaults to localStorage for web

// REDUX PERSIS
const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
};

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['userData', 'isAuthenticated', 'status'],
};

const rootReducer = combineReducers({
    counter: counterReducer,
    authenticate: persistReducer(authPersistConfig, authenticateReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        },
    ).concat(thunk),
    devTools: import.meta.env.VITE_APP_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch