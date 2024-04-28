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

function* fetchInsurerDetail() {
  try {
    yield put({ type: 'CLEAR_INSURER_DATA' });
  } catch (err) {
    console.error('FAILED TO FETCH INSURANCE PROVIDERS:', err);
  }
}

function* providerSaga() {
  yield takeLatest('FETCH_PROVIDER_DATA', fetchProviderDetails);
  yield takeLatest('FETCH_INSURANCE_PROVIDERS', fetchInsurerDetail);
}

export default providerSaga;
