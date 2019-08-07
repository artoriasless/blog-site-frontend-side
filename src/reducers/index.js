import { actionTypes } from 'actions';

import changeRouteFunc from './change-route';

const defaultState = {
    current: '',
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
    userInfo: {},
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
const reducers = (state = defaultState, action = {}) => {
    switch (action.type) {

    case actionTypes.CHANGE_ROUTE:
        return changeRouteFunc(state, action);

    default:
        return state;
    }
};

export default reducers;