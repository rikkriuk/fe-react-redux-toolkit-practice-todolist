import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoReducer from "./async/todoSlice";
import langReducer from "./slices/langSlice";
import themeReducer from "./slices/themeSlice";

const langPersistConfig = {
  key: "lang",
  storage,
};

const themePersistConfig = {
  key: "theme",
  storage,
};

const persistedLangReducer = persistReducer(langPersistConfig, langReducer);
const persistedThemeReducer = persistReducer(themePersistConfig, themeReducer);

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    lang: persistedLangReducer,
    theme: persistedThemeReducer,
  },
});

export const persistor = persistStore(store);
