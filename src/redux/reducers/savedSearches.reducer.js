const savedSearches = (state = { loading: true, searchList: [] }, action) => {
  switch (action.type) {
    case 'SET_SEARCHES':
      return { loading: false, searchList: [action.payload] };
    case 'CLEAR_SEARCHES':
      return { loading: true, searchList: [] };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default savedSearches;
