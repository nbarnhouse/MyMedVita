import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import providerSaga from './provider.saga';
import categorySaga from './category.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    providerSaga(),
    categorySaga(),
  ]);
}
