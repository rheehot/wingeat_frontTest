const initialState = {
  count: 0,
};

export default function cartCount(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_COUNT':
      return {
        ...state,
        count: action.payload,
      };

    default:
      return state;
  }
}
