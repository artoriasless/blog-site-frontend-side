import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';

import { actionTypes } from 'actions';

import changeRouteFunc from './change-route';
import updateTimestampFunc from './update-timestamp';

import getUserDefault from './get-user-default';
import loginFunc from './login';
import logoutFunc from './logout';
import registerFunc from './register';
import updateUserInfoFunc from './update-user-info';

const defaultState = {
    current: (() => document.URL.replace(/^[^/]+\/\/[^/]+/, ''))(),
    isLogin: false,
    hasReqDefault: false,
    userInfo: {},
    timestamp: Date.parse(new Date()),

    cache: {
        isLogin: false,
        login: {},
        register: {},
        userInfo: { userName: '', gender: 0, },
        pwd: {
            original: '',
            modify: '',
            confirm: '',
        },
        reply: {},
        paper: {
            title: '',
            tag: '',
            subtag: '',
            brief: '',
            content: '',
        },
    },
    message: {},
    filter: {
        latest: { count: 0, rows: [], },
        tag: { count: 0, rows: [], },
        timeline: { count: 0, rows: [], },
    },
    catalogue: {
        current: 1,
        dataCount: 0,
        rows: []
    },
    paper: {},
    reply: {},
};
const appReducer = (state = defaultState, action = {}) => {
    switch (action.type) {

    case actionTypes.CHANGE_ROUTE:
        return changeRouteFunc(state, action);
    case actionTypes.UPDATE_TIMESTAMP:
        return updateTimestampFunc(state, action);

    case actionTypes.GET_USER_DEFAULT:
        return getUserDefault(state, action);

    case actionTypes.LOGIN:
        return loginFunc(state, action);

    case actionTypes.LOGOUT:
        return logoutFunc(state, action);

    case actionTypes.REGISTER:
        return registerFunc(state, action);

    case actionTypes.UPDATE_USER_INFO:
        return updateUserInfoFunc(state, action);

    default:
        return state;
    }
};
const store = createStore(
    combineReducers({
        appReducer,
        routing: routerReducer,
    }),
    applyMiddleware(thunk)
);

export default store;