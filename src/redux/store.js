import { createStore, applyMiddleware } from "redux";
import { appReducer } from "./reducer/index.js";
// import thunk from 'redux-thunk'
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// const persistConfig = {
//     key: "root",
//     storage,
// };
// const persistedReducer = persistReducer(persistConfig, todoApp);

export const store = createStore(appReducer);
// export let persistor = persistStore(store);