const updateTimestamp = (originalState, action) => {
    const newState = JSON.parse(JSON.stringify(originalState));

    newState.current = action.payload.current;
    newState.timestamp = action.payload.timestamp;

    return newState;
};

export default updateTimestamp;