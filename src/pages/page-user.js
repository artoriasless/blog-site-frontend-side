import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeRoute as changeRouteAction } from 'actions';
import {
    Navbar,
    LoginModal,
    UserCenter,
    EditInfoModal,
    EditPwdModal,
} from 'components';
import {
    getRoute,
    stanLoading
} from 'lib';

const UI_PageUser = function(props){
    const { current, changeRoute } = props;

    useEffect(() => {
        stanLoading();

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);
    }, []);

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
const mapDispatch2Props = (dispatch, props) => ({ // eslint-disable-line
    changeRoute: () => dispatch(changeRouteAction()),
});
let PageUser;

UI_PageUser.propTypes = {
    changeRoute: PropTypes.func.isRequired,
    current: PropTypes.string,
};

PageUser= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageUser);

export default PageUser;