import store from 'reducers';

import {
    getRoute,
    ajaxAction,
    stanAlert
} from 'lib';

const LOGIN = userInfo => {
    const current = getRoute();

    return ({
        type: 'LOGIN',
        payload: {
            current,
            userInfo,
        },
    });
};
const login = jsonData => {
    const successFunc = function(result) {
        if (result.success) {
            stanAlert({
                type: 'success',
                content: result.message,
                textAlign: 'center',
                shownExpires: 0.75,
            });

            $('#loginModal').modal('hide');
            store.dispatch(LOGIN(result.data));
        } else {
            stanAlert({
                title: 'Warning!',
                content: result.message,
            });
        }
    };
    const failFunc = function(err) {
        stanAlert({
            title: 'Warning!',
            content: err.toString(),
        });
        console.info(err);  //  eslint-disable-line
    };

    return ajaxAction('user.login', jsonData, successFunc, failFunc);
};

export default login;