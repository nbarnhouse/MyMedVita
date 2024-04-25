// Import 3rd Party Libraries
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//Worker Sagas

// Outpatient
function* fetchOutpatient() {
  const response = yield axios.get('/api/category/codes/1');
  yield put({ type: 'SET_OUTPATIENT', payload: response.data });
}

// Laboratory
function* fetchLaboratory() {
  const response = yield axios.get('/api/category/codes/2');
  yield put({ type: 'SET_OUTPATIENT', payload: response.data });
}

// Radiology
function* fetchRadiology() {
  const response = yield axios.get('/api/category/codes/3');
  yield put({ type: 'SET_OUTPATIENT', payload: response.data });
}

// Surgery
function* fetchSurgery() {
  const response = yield axios.get('/api/category/codes/4');
  yield put({ type: 'SET_OUTPATIENT', payload: response.data });
}

// Watcher Sagas
function* categorySaga() {
  yield takeEvery('FETCH_OUTPATIENT', fetchOutpatient);
  yield takeEvery('FETCH_LABORATORY', fetchLaboratory);
  yield takeEvery('FETCH_RADIOLOGY', fetchRadiology);
  yield takeEvery('FETCH_SURGERY', fetchSurgery);
}

export default categorySaga;
