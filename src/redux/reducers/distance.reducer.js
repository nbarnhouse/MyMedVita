const distanceReducer = (state = [], action) => {
  switch (action.type) {
    case 'SUBMIT_DISTANCE_DATA':
      console.log('DISTANCE DATA REDUCER:', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default distanceReducer;
