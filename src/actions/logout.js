import store from 'reducers';

import {
    getRoute,
    ajaxAction,
    stanAlert
} from 'lib';

const LOGOUT = userInfo => {
    const current = getRoute;

    return ({
        type: 'LOGOUT',
        payload: {
            current,
            userInfo,
        },
    });
};
const logout = () => {
    const successFunc = function(result) {
        stanAlert({
            type: 'success',
            content: result.message,
            textAlign: 'center',
            shownExpires: 0.75,
        });
        store.dispatch(LOGOUT(result.data));
    };
    const failFunc = function(err) {
        stanAlert({
            type: 'danger',
            title: 'Error!',
            content: err.toString(),
        });
        console.info(err);  //  eslint-disable-line
    };

    return ajaxAction('user.logout', {}, successFunc, failFunc);
};

export default logout;