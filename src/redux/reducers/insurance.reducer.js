const insuranceReducer = (
  state = { loading: true, insuranceList: [] },
  action
) => {
  switch (action.type) {
    case 'CLEAR_INSURANCE_DATA':
      return { loading: true, insuranceList: [] };
    case 'SET_INSURANCE_DATA':
      return { ...action.payload, loading: false };
    default:
      return state;
  }
};

export default insuranceReducer;
