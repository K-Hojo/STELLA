export const SIGNUP = 'SIGNUP';
export const signupAction = () => {
  return {
    type: 'SIGNUP',
    payload: {

    }
  }
};

export const USER_ACCOUNT_ACTIVATION = 'USER_ACCOUNT_ACTIVATION';
export const userAccountActivationAction = () => {
  return {
    type: 'USER_ACCOUNT_ACTIVATION',
    payload: {

    }
  }
};

export const LOGIN = 'LOGIN';
export const loginAction = () => {
  return {
    type: 'LOGIN',
    payload: {
      isAuthenticated: true,
    }
  }
};

export const LOGOUT = 'LOGOUT';
export const logoutAction = () => {
  return {
    type: 'LOGOUT',
    payload: {
      username: '',
    }
  }
};