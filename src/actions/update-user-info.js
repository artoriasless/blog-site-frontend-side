import store from 'reducers';

import {
    getRoute,
    ajaxAction,
    stanAlert
} from 'lib';

const UPDATE_USER_INFO = userInfo => {
    const current = getRoute();

    return ({
        type: 'UPDATE_USER_INFO',
        payload: {
            current,
            userInfo,
        },
    });
};
const updateUserInfo = jsonData => {
    const successFunc = function(result) {
        if (result.success) {
            stanAlert({
                type: 'success',
                content: result.message,
                textAlign: 'center',
                shownExpires: 0.75,
            });

            $('#editInfoModal').modal('hide');
            store.dispatch(UPDATE_USER_INFO(result.data));
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

    return ajaxAction('user.updateInfo', jsonData, successFunc, failFunc);
};

export default updateUserInfo;