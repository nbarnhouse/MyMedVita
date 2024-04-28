import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import provider from './provider.reducer';
import distance from './distance.reducer';
import categoryReducer from './category.reducer';
import insurance from './insurance.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  provider,
  distance,
  categoryReducer,
  insurance,
});

export default rootReducer;
