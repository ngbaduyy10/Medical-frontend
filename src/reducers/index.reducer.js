import { combineReducers } from "redux";
import { setUserReducer } from "./user.reducer";
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const allReducers = combineReducers({
    setUserReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);