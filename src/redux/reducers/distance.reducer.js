const distanceReducer = (state = [], action) => {
  switch (action.type) {
    case 'SUBMIT_DISTANCE_DATA':
      console.log('DISTANCE DATA REDUCER:', action.payload);
      return { ...action.payload, searchCoords: { zip: 0, lat: 0, lon: 0 } };
    case 'SET_SEARCH_COORDS':
      console.log('SET COORDS FOR ZIP:', action.payload.zip);
      return {
        ...state,
        searchCoords: {
          zip: action.payload.zip,
          lat: action.payload.lat,
          lon: action.payload.long,
        },
      };
    default:
      return state;
  }
};

export default distanceReducer;
