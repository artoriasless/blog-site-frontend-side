import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    ajaxAction,
    stanAlert,
    stanLoading
} from 'lib';

const UI_ActivateAccount = function(props) {
    const { uuid } = props;
    const activateAccount = () => {
        const jsonData = {
            uuid,
        };
        const successFunc = function(result) {
            // 最后通过浏览器跳转刷新的方式回到首页，此处免去更新 state 的步骤
            stanLoading('hide');

            if (result.success) {
                stanAlert({
                    type: 'success',
                    content: result.message,
                    textAlign: 'center',
                    shownExpires: 1,
                });
            } else {
                stanAlert({
                    title: 'Warning!',
                    content: result.message,
                });
            }

            setTimeout(() => {
                stanAlert({
                    type: 'info',
                    content: 'ready to home page...',
                    textAlign: 'center',
                    shownExpires: 1,
                });

                setTimeout(() => {
                    location.href='/';
                }, 1000);
            }, 1500);
        };
        const failFunc = function(err) {
            stanLoading('hide');

            setTimeout(() => {
                stanAlert({
                    title: 'Warning!',
                    content: err.toString(),
                });
                console.info(err);  //  eslint-disable-line
            }, 1000);
        };

        stanLoading();
        ajaxAction('user.activate', jsonData, successFunc, failFunc);
    };

    useEffect(() => {
        activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let ActivateAccount;

UI_ActivateAccount.propTypes = {
    uuid: PropTypes.string,
};

ActivateAccount= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_ActivateAccount);

export default ActivateAccount;