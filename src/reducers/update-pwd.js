const updatePwd = (originalState, action) => {
    const newState = JSON.parse(JSON.stringify(originalState));

    newState.current = action.payload.current;
    newState.userInfo = action.payload.userInfo;

    return newState;
};

export default updatePwd;