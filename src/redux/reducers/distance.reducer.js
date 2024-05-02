const distanceReducer = (state = [], action) => {
  switch (action.type) {
    case 'SUBMIT_DISTANCE_DATA':
      console.log('DISTANCE DATA REDUCER:', action.payload);
      return action.payload;
    case 'SET_SEARCH_COORDS':
      console.log('SET COORDS FOR ZIP:', action.payload.zip);
      return {
        ...state,
        searchZIP: action.payload.zip,
        searchLat: action.payload.lat,
        searchLong: action.payload.long,
      };
    default:
      return state;
  }
};

export default distanceReducer;
