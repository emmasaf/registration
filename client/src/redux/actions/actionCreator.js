import {
  GET_USERS,
  SET_USERS,
  POST_USER,
  SET_REG_USER,
  SET_LOGED_USER,
  LOG_IN,
  GET_USER,
  SET_USER,
  LOG_OUT,
  EDIT_USER,
  SET_ERROR,
  CLEAR_ERROR,
} from '../constants'

export const getUsers = () => ({
  type: GET_USERS,
})

export const setUsers = data => ({
  type: SET_USERS,
  payload: data,
})
export const registerUser = data => ({
  type: POST_USER,
  payload: data,
})

export const setRegUser = data => ({
  type: SET_REG_USER,
  payload: data,
})

export const login = data => ({
  type: LOG_IN,
  payload: data,
})
export const logout = () => ({
  type: LOG_OUT,
})

export const setLoginUser = data => ({
  type: SET_LOGED_USER,
  payload: data,
})

export const getUserData = () => ({
  type: GET_USER,
})

export const setUserData = data => ({
  type: SET_USER,
  payload: data,
})

export const editUser = data => ({
  type: EDIT_USER,
  payload: data,
})

export const setNotification = payload => ({
  type: SET_ERROR,
  payload,
})

export const clearNotification =() => ({
  type: CLEAR_ERROR,
})
