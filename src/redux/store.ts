import { createStore, applyMiddleware } from "redux";
import { appReducer } from "./reducers/index";
// import thunk from 'redux-thunk'
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// const persistConfig = {
//     key: "root",
//     storage,
// };
// const persistedReducer = persistReducer(persistConfig, todoApp);
const store = createStore(appReducer);
export default store;
// export let persistor = persistStore(store);
