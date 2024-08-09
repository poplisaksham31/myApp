const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ACTIVE_COUNT":
            return {
                ...state,
                counter: state.counter + action.count,
            };
        default:
            return state;
    }
};

export default counterReducer;
