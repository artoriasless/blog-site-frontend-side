import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeRoute } from 'actions';
import {
    Navbar,
    LoginModal,
    ActivateAccount
} from 'components';
import {
    getRoute,
    stanLoading
} from 'lib';

const UI_PageActivate = function(props) {
    const { current, params, changeRoute } = props;

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
        <div className="page-activate" key={ current }>
            <Navbar/>
            <div className="page-section-body">
                <ActivateAccount uuid={ params.uuid }/>
            </div>
            <LoginModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = (dispatch, props) => ({ // eslint-disable-line
    changeRoute,
});
let PageActivate;

UI_PageActivate.propTypes = {
    params: PropTypes.object,
    changeRoute: PropTypes.func.isRequired,
    current: PropTypes.string,
};

PageActivate= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageActivate);

export default PageActivate;