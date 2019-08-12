const changeRoute = (originalState, action) => {
    const newState = JSON.parse(JSON.stringify(originalState));

    newState.current = action.payload.current;

    return newState;
};

export default changeRoute;