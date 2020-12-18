import { createStore } from "redux";
import { appReducer } from "./reducers";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// const persistConfig = {
//     key: "root",
//     storage,
//     blacklist: [],
// };
// const persistedReducer = persistReducer(persistConfig, appReducer);

const store = createStore(appReducer);


// const persistor = persistStore(store);
export { store }
