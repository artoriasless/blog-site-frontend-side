import store from 'reducers';

import {
    getRoute,
    ajaxAction,
    stanAlert
} from 'lib';

const REGISTER = userInfo => {
    const current = getRoute();

    return ({
        type: 'REGISTER',
        payload: {
            current,
            userInfo,
        },
    });
};
const register = jsonData => {
    const successFunc = function(result) {
        if (result.success) {
            stanAlert({
                type: 'success',
                content: `${result.message}<br/>login your email to activate account`,
                textAlign: 'center',
                shownExpires: 0.75,
            });

            $('#loginModal').modal('hide');
            store.dispatch(REGISTER(result.data));
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

    return ajaxAction('user.register', jsonData, successFunc, failFunc);
};

export default register;
