import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUserDetails() {
  try {
    const response = yield axios.get('/api/userdetails');

    yield put({ type: 'SET_USER_DETAILS', payload: response.data });
  } catch (error) {
    console.log('USER DATA GET REQUEST FAILED', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER_DATA', fetchUserDetails);
}

export default userSaga;
