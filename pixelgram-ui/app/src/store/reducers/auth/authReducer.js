import * as actionTypes from "../../actionTypes";
import { clearUserFromStorage } from '../../../helperClasses/localStorage'

const initialState = {
    isUserLoggedIn: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USER_LOGIN: {
            return {
                ...state,
                isUserLoggedIn: true
            };
        }
        case actionTypes.USER_LOGOUT: {
            clearUserFromStorage();
            return {
                ...state,
                isUserLoggedIn: false
            };
        }
        default:
            return state;
    }
}
