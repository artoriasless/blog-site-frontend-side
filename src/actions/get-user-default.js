import store from 'reducers';

import {
    ajaxAction
} from 'lib';

const GET_USER_DEFAULT = userInfo => {
    const url = document.URL;
    const reg = /^[^/]+\/\/[^/]+/;
    const current = url.replace(reg, '');

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
        console.info(err);  //  eslint-disable-line
    };

    return ajaxAction('user.default', {}, successFunc, failFunc);
};

export default getUserDefault;