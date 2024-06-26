// Import 3rd Party Libraries
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//Worker Sagas

// Outpatient
function* fetchOutpatient() {
  try {
    const response = yield axios.get('/api/category/codes/1');
    yield put({ type: 'SET_OUTPATIENT', payload: response.data });
  } catch (error) {
    console.log('Error FETCHING OUTPATIENT - SAGA: ', error);
  }
}

// Laboratory
function* fetchLaboratory() {
  try {
    const response = yield axios.get('/api/category/codes/2');
    yield put({ type: 'SET_LABORATORY', payload: response.data });
  } catch (error) {
    console.log('ERROR FETCHING LABORATORY - SAGA: ', error);
  }
}

// Radiology
function* fetchRadiology() {
  try {
    const response = yield axios.get('/api/category/codes/3');
    yield put({ type: 'SET_RADIOLOGY', payload: response.data });
  } catch (error) {
    console.log('ERROR FETCHING RADIOLOGY - SAGA : ', error);
  }
}

// Surgery
function* fetchSurgery() {
  try {
    const response = yield axios.get('/api/category/codes/4');
    yield put({ type: 'SET_SURGERY', payload: response.data });
  } catch (error) {
    console.log('ERROR FETCHING SURGERY - SAGA : ', error);
  }
}

// Watcher Sagas
function* categorySaga() {
  yield takeEvery('FETCH_OUTPATIENT', fetchOutpatient);
  yield takeEvery('FETCH_LABORATORY', fetchLaboratory);
  yield takeEvery('FETCH_RADIOLOGY', fetchRadiology);
  yield takeEvery('FETCH_SURGERY', fetchSurgery);
}

export default categorySaga;
