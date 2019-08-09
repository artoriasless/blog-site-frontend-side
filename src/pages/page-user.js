import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeRoute } from 'actions';
import {
    Navbar,
    LoginModal,
    UserCenter,
    EditInfoModal,
    EditPwdModal,
} from 'components';
import {
    getRoute,
    stanLoading,
    stanAlert,
} from 'lib';

const UI_PageUser = function(props){
    const {
        current,
        changeRoute,
        isLogin,
    } = props;

    useEffect(() => {
        stanLoading();

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);

        if (!isLogin) {
            stanLoading('hide');
            stanAlert({
                type: 'danger',
                content: 'please login first, going to home page now...',
                textAlign: 'center',
                shownExpires: 0.75,
            });

            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }, [isLogin]);

    if (getRoute() !== current) {
        changeRoute();
    }

    return (
        <div className="page-user" key={ props.current }>
            <Navbar/>
            <div className="page-section-body">
                <UserCenter/>
            </div>
            <LoginModal/>
            <EditInfoModal/>
            <EditPwdModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({
    changeRoute,
});
let PageUser;

UI_PageUser.propTypes = {
    isLogin: PropTypes.bool,
    changeRoute: PropTypes.func.isRequired,
    current: PropTypes.string,
};

PageUser= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageUser);

export default PageUser;