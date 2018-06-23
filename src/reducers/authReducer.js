import * as types from '../constants/actionTypes';

const initialState = {
  auth: {
    isAuthenticated: false,
    errors: {},
  },
};

export default function (state = initialState.auth, action) {
  switch (action.type) {
    case types.AUTHENTICATED:
      return { ...state, ...action.payload };
    case types.AUTHENTICATE_ERROR:
      return { ...state, errors: {error_code: action.error_code.message} }
    default:
      return state;
  }
}
