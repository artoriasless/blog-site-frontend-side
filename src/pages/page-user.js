import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Navbar,
    LoginModal,
    UserCenter,
    EditInfoModal,
    EditPwdModal,
} from 'components';
import {
    stanLoading,
    stanAlert,
    initSeo,
} from 'lib';

const UI_PageUser = function(props){
    const {
        isLogin,
        hasReqDefault,
        userInfo
    } = props;

    useEffect(() => {
        initSeo({}, {
            index: false
        });
        stanLoading();

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isLogin && hasReqDefault) {
        stanLoading('hide');
        stanAlert({
            type: 'danger',
            content: 'please login first, going to home page now...',
            textAlign: 'center',
            shownExpires: 0.75,
            autoClose: false
        });

        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    }

    return (
        <div className="page-user">
            <Navbar/>
            <div className="page-section-body">
                <UserCenter/>
            </div>
            <LoginModal/>
            <EditInfoModal userInfo={ userInfo }/>
            <EditPwdModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PageUser;

UI_PageUser.propTypes = {
    isLogin: PropTypes.bool,
    hasReqDefault: PropTypes.bool,
    userInfo: PropTypes.object
};

PageUser= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageUser);

export default PageUser;