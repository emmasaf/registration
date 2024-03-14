import { takeEvery, put, call } from '@redux-saga/core/effects'
import {
  getUsers,
  postUser,
  loginUser,
  getUser,
  putUserData,
  notificationCall,
} from '../../api'
import {
  EDIT_USER,
  GET_USER,
  GET_USERS,
  LOG_IN,
  LOG_OUT,
  POST_USER,
} from '../constants'
import {
  setLoginUser,
  setUsers,
  setUserData,
  // someError,
  setRegUser,
  setNotification,
  clearNotification,
} from '../actions/actionCreator'

function* handleNotification(data) {
  try {
    const { message, type } = data
    yield put(setNotification({ message, type }))

    yield call(delay, 2000)
    yield put(clearNotification())
  } catch (error) {
    console.error('Error:', error)
  }
}

function delay(duration) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

export function* fetchDataUsersSaga() {
  try {
    const data = yield call(getUsers)
    yield put(setUsers(data))
  } catch (error) {
    yield handleNotification({
      message: 'Can not fetch user data',
      type: 'error',
    })
  }
}

export function* registerUserData(action) {
  try {
    const data = yield call(postUser, action.payload)
    yield put(setRegUser(data))
    yield handleNotification({
      message: 'Registered successfully',
      type: 'success',
    })
  } catch (error) {
    console.log('error')
    yield handleNotification({ message: 'Email already exist', type: 'error' })
  }
}

export function* login(action) {
  try {
    const data = yield call(loginUser, action.payload)
    yield put(setLoginUser(data))
    // yield  handleNotification({
    //   message: 'Logged in successfully',
    //   type: 'success',
    // })
  } catch (error) {
    yield handleNotification({ message: 'User does not exist', type: 'error' })
  }
}

export function* logout() {
  yield localStorage.removeItem('token')
  yield handleNotification({
    message: 'Logged out successfully',
    type: 'success',
  })
}

export function* userDataFetch(action) {
  try {
    const data = yield call(getUser, action.payload)
    yield put(setUserData(data))
  } catch (error) {
    yield handleNotification({ message: 'Can not fetch data', type: 'error' })
  }
}

export function* editUserData(action) {
  try {
    yield call(putUserData, action.payload)
    yield handleNotification({
      message: 'User data was edited',
      type: 'successc',
    })
  } catch (error) {
    yield handleNotification({
      message: 'Can not edit user data',
      type: 'error',
    })
  }
}

export function* watchFetchData() {
  yield takeEvery(GET_USERS, fetchDataUsersSaga)
  yield takeEvery(POST_USER, registerUserData)
  yield takeEvery(LOG_IN, login)
  yield takeEvery(GET_USER, userDataFetch)
  yield takeEvery(LOG_OUT, logout)
  yield takeEvery(EDIT_USER, editUserData)
}

export default function* rootSaga() {
  yield watchFetchData()
}
