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
    const response = yield axios.get('/api/insurance');
    yield put({ type: 'SET_INSURANCE_DATA', payload: response.data });
  } catch (err) {
    console.error('FAILED TO FETCH INSURANCE PROVIDERS:', err);
  }
}

function* fetchSearchCoords(action) {
  try {
    const response = yield axios.get(`/api/location/${action.payload}`);
    console.log('FETCH ZIP RESULTS:', response);
    yield put({
      type: 'SET_SEARCH_COORDS',
      payload: {
        zip: action.payload,
        lat: response.data.lat,
        long: response.data.long,
      },
    });
  } catch (err) {
    console.error('FAILED TO FETCH SEARCH COORDS:', err);
  }
}

function* providerSaga() {
  yield takeLatest('FETCH_PROVIDER_DATA', fetchProviderDetails);
  yield takeLatest('FETCH_INSURANCE_PROVIDERS', fetchInsurerDetail);
  yield takeLatest('FETCH_SEARCH_COORDS', fetchSearchCoords);
}

export default providerSaga;
