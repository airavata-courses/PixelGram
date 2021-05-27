import { createStore } from "redux";
import authReducer from "./reducers/auth/authReducer";
import { combineReducers } from "redux";

const store = createStore(
    combineReducers({
        auth: authReducer,
    })
);

export default store;
