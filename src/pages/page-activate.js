import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Navbar,
    LoginModal,
    ActivateAccount
} from 'components';
import {
    stanLoading,
    initSeo
} from 'lib';

const UI_PageActivate = function(props) {
    const { params } = props;

    useEffect(() => {
        initSeo({}, {
            index: false,
        });
        stanLoading();

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);
    }, []);

    return (
        <div className="page-activate">
            <Navbar/>
            <div className="page-section-body">
                <ActivateAccount uuid={ params.uuid }/>
            </div>
            <LoginModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PageActivate;

UI_PageActivate.propTypes = {
    params: PropTypes.object,
    current: PropTypes.string,
};

PageActivate= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageActivate);

export default PageActivate;