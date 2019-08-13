import store from 'reducers';

import {
    getRoute,
    ajaxAction,
    stanAlert
} from 'lib';

const UPDATE_PWD = userInfo => {
    const current = getRoute();

    return ({
        type: 'UPDATE_PWD',
        payload: {
            current,
            userInfo,
        },
    });
};
const updatePwd = jsonData => {
    const successFunc = function(result) {
        if (result.success) {
            stanAlert({
                type: 'success',
                content: result.message,
                textAlign: 'center',
                shownExpires: 0.75,
            });

            $('#editPwdModal').modal('hide');
            store.dispatch(UPDATE_PWD(result.data));
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

    return ajaxAction('user.updatePwd', jsonData, successFunc, failFunc);
};

export default updatePwd;