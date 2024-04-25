// Import 3rd Party Libraries
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//Worker Sagas

// Outpatient
function* fetchOutpatient() {}

// Laboratory
function* fetchLaboratory() {}

// Radiology
function* fetchRadiology() {}

// Surgery
function* fetchSurgery() {}

// Watcher Sagas
function* categorySaga() {
  yield takeEvery('FETCH_OUTPATIENT', fetchOutpatient);
  yield takeEvery('FETCH_LABORATORY', fetchLaboratory);
  yield takeEvery('FETCH_RADIOLOGY', fetchRadiology);
  yield takeEvery('FETCH_SURGERY', fetchSurgery);
}

export default categorySaga;
