import { USER_LOGIN, USER_LOGOUT } from '../../actionTypes'

export const userLogin = () => {
    return {
        type: USER_LOGIN,

    }
}

export const userLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}
