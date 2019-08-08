import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserDefault } from 'actions';

import {
    hideMainScrollerbar,
    initCompassIcon,
    initNavbarBG,
} from 'lib';

const UI_App = function(props) {
    if (!props.isLogin && !props.hasReqDefault) {
        getUserDefault();
    }

    useEffect(() => {
        hideMainScrollerbar();
        initCompassIcon();
        initNavbarBG();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app">
            { props.children }
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = (dispatch, props) => ({ // eslint-disable-line
    getUserDefault,
});
let App;

UI_App.propTypes = {
    children: PropTypes.element,
    isLogin: PropTypes.bool,
    hasReqDefault: PropTypes.bool,
};

App = connect(
    mapState2Props,
    mapDispatch2Props,
)(UI_App);

export default App;