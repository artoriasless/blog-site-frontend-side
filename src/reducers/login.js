const login = (originalState, action) => {
    const newState = JSON.parse(JSON.stringify(originalState));

    newState.current = action.payload.current;
    newState.isLogin = true;
    newState.userInfo = action.payload.userInfo;

    return newState;
};

export default login;