import {
  SET_USERS,
  SET_REG_USER,
  SET_LOGED_USER,
  SET_USER,
  LOG_OUT,
  SET_ERROR,
  CLEAR_ERROR,
} from '../constants'

const initialState = {
  users: [],
  regUser: null,
  logedUser: null,
  user: {},
  error: null,
}

const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      return { ...state, users: payload }
    case SET_REG_USER:
      return { ...state, regUser: payload }
    case SET_LOGED_USER:
      return { ...state, logedUser: payload }
    case SET_USER:
      return { ...state, user: payload, error: null }
    case LOG_OUT:
      return { ...initialState }
    case SET_ERROR:
      return { ...state, error: payload }
    case CLEAR_ERROR:
      return { ...state, error: null }
    default:
      return state
  }
}

export default auth
