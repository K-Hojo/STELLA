// import axios from 'axios';
// import { push } from 'react-router-dom'
// import { AuthUrls } from './urls'

//pushをどういれるかが問題。history = useHistory()は関数コンポーネントの直下でしか呼べない。一方loginは純粋なロジック。
// export const login = (formValues) => {
//   const loginUrl = AuthUrls.LOGIN;

//   return async (dispatch) => {
//     await axios.post(loginUrl, formValues)
//       .then(response => {
//         const token = response.data.key;
//         sessionStorage.setItem("token", token);
//         dispatch(loginAction(token));
//         dispatch(push("/"));
//       })
//   }
// }

// export const logout = () => {
//   const logoutUrl = AuthUrls.LOGOUT;

//   return (dispatch) => {
//     axios.post(logoutUrl)
//       .then(response => {
//         dispatch(logoutAction());
//         dispatch(push("/"));
//       })
//   }
// }

export const LOGIN = 'LOGIN'
export const loginAction = (token) => {
  return {
    type: 'LOGIN',
    payload: {
      token: token,
      isAuthenticated: true,
    }
  }
}

export const LOGOUT = 'LOGOUT';
export const logoutAction = () => {
  return {
    type: 'LOGOUT',
    payload: {
      token: '',
      isAuthenticated: false,
    }
  }
}