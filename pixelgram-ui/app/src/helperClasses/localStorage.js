export const getUserIdFromLocalStorage = () => {
    return localStorage.getItem('userId');
}

export const addUserIdInLocalStorage = (userId) => {
    localStorage.setItem('userId', userId)
}

export const getUserNameFromLocalStorage = () => {
    return localStorage.getItem('userName');
}

export const addUserNameInLocalStorage = (userId) => {
    localStorage.setItem('userName', userId)
}

export const clearUserFromStorage = () => {
    localStorage.clear();
}