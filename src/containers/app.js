import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    changeRoute,
    getUserDefault
} from 'actions';
import {
    getRoute,
    hideMainScrollerbar,
    initCompassIcon,
    initNavbarBG,
} from 'lib';

const UI_App = function(props) {
    const {
        current,
        getUserDefault,
        children,
        hasReqDefault
    } = props;

    useEffect(() => {
        hideMainScrollerbar();
        initCompassIcon();
        initNavbarBG();

        getUserDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (getRoute() !== current) {
        changeRoute();
    }

    if (!hasReqDefault) {
        return null;
    } else {
        return (
            <div className="app">
                { children }
            </div>
        );
    }
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({
    getUserDefault,
});
let App;

UI_App.propTypes = {
    hasReqDefault: PropTypes.bool,
    current: PropTypes.string,
    getUserDefault: PropTypes.func.isRequired,
    children: PropTypes.element,
};

App = connect(
    mapState2Props,
    mapDispatch2Props,
)(UI_App);

export default App;