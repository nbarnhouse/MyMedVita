// Import 3rd Party Libraries
import { combineReducers } from 'redux';

// Create Reducer
const outpatientReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OUTPATIENT':
      return action.payload;
    default:
      return state;
  }
};

// Create Reducer
const laboratoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LABORATORY':
      return action.payload;
    default:
      return state;
  }
};

// Create Reducer
const radiologyReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RADIOLOGY':
      return action.payload;
    default:
      return state;
  }
};

// Create Reducer
const surgeryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SURGERY':
      return action.payload;
    default:
      return state;
  }
};

// Export Reducer
export default combineReducers({
  outpatientReducer,
  laboratoryReducer,
  radiologyReducer,
  surgeryReducer,
});
