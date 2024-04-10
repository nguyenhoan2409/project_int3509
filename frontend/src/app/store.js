import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authSlice from "~/features/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);
export default () => {
  let store = configureStore({
    reducer: {
      auth: persistedReducer,
    }, 
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });

  let persistor = persistStore(store);
  return { store, persistor };
};
