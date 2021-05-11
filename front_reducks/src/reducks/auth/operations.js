import { SubmissionError } from 'redux-form';
import { loginAction } from './actions';
import { AuthUrls } from "./urls";
import { push }  from 'connected-react-router';
import axios from 'axios';


export const signup = (formValues) => {
  return async (dispatch) => {
    const signupUrl = AuthUrls.SIGNUP;

    await axios.post(signupUrl, formValues)
        .then((response) => {
              // If request is good...
              // you can login if email verification is turned off.
              // const token = response.data.key;
              // dispatch(authLogin(token));
              // localStorage.setItem("token", token);

              // email need to be verified, so don't login and send user to signup_done page.
              // redirect to signup done page.
              dispatch(push("/signup_done"));
          })
          .catch((error) => {
              // If request is bad...
              // Show an error to the user
              const processedError = processServerError(error.response.data);
              throw new SubmissionError(processedError);
          });
          }
}

export const login = (formValues) => {
  const loginUrl = AuthUrls.LOGIN;

  return async (dispatch) => {
    await axios.post(loginUrl, formValues)
      .then(response => {
        const token = response.data.key;
        dispatch(loginAction())

        sessionStorage.setItem("token", token)

        dispatch(push("/"));
      })
  }
}


function processServerError(error) {
  return  Object.keys(error).reduce(function(newDict, key) {
      if (key === "non_field_errors") {
          newDict["_error"].push(error[key]);
      } else if (key === "token") {
          // token sent with request is invalid
          newDict["_error"].push("The link is not valid any more.");
      } else {
          newDict[key] = error[key];
      }

      return newDict
  }, {"_error": []});
}