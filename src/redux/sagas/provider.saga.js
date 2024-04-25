import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchProviderDetails() {
  try {
    const response = yield axios.get('/api/provider');

    yield put({ type: 'SET_PROVIDER_DATA', payload: response.data });
  } catch (error) {
    console.log('PROVIDER DATA GET REQUEST FAILED', error);
  }
}

function* providerSaga() {
  yield takeLatest('FETCH_PROVIDER_DATA', fetchProviderDetails);
}

export default providerSaga;
