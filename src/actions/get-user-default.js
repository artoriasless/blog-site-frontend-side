import store from 'reducers';

import {
    getRoute,
    ajaxAction,
    stanAlert,
} from 'lib';

const GET_USER_DEFAULT = userInfo => {
    const current = getRoute();

    return ({
        type: 'GET_USER_DEFAULT',
        payload: {
            current,
            userInfo,
        },
    });
};
const getUserDefault = () => {
    const successFunc = function(result) {
        store.dispatch(GET_USER_DEFAULT(result.data));
    };
    const failFunc = function(err) {
        stanAlert({
            title: 'Warning!',
            content: 'connect to server failed, please try again later...',
            autoClose: false
        });
        console.info(err);  //  eslint-disable-line
    };

    return ajaxAction('user.default', {}, successFunc, failFunc);
};

export default getUserDefault;