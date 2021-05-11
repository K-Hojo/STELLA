import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import { AuthReducer } from '../auth/reducers';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';



export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      form: formReducer,
      auth: AuthReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}