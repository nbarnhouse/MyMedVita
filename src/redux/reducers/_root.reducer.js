import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import provider from './provider.reducer';
import distance from './distance.reducer';
import categoryReducer from './category.reducer';
import insurance from './insurance.reducer';
import savedSearches from './savedSearches.reducer';
import userDetails from './details.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  provider,
  distance,
  categoryReducer,
  insurance,
  savedSearches,
  userDetails,
});

export default rootReducer;
