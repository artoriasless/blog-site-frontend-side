const logout = (originalState, action) => {
    const newState = JSON.parse(JSON.stringify(originalState));

    newState.current = action.payload.current;
    newState.isLogin = false;
    newState.userInfo = action.payload.userInfo;

    return newState;
};

export default logout;