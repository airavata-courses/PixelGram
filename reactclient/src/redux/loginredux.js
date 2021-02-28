const initialState = {
  status:false
}

export const fetchStatus = () => {
  return (dispatch) => {
    //axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the Status
        const status = response.data
        dispatch(fetchLoginStatus(status))
      })
      .catch(error => {
        // error.message is the error message
        alert(error.message)
      })
  }
}

export const fetchLoginStatus = users => {
  return {
    type: FETCH_LOGIN_STATUS,
    payload: status
  }
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_STATUS:
      return {
        status: action.payload,
      }
      }
    default: return state
  }
}

export default loginReducer