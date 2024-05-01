const detailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default detailsReducer;
