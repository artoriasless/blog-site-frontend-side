import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeRoute } from 'actions';
import {
    Navbar,
    LoginModal,
    PaperFilter,
    Paper,
    ReplyModal
} from 'components';
import {
    getRoute,
    stanLoading
} from 'lib';

const UI_PagePaper = function(props) {
    const paperId = props.params.paperId;

    useEffect(() => {
        stanLoading();

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);
    }, []);

    if (getRoute() !== props.current) {
        props.changeRoute();
    }

    return (
        <div className="page-paper" key={ props.current }>
            <Navbar/>
            <div className="page-section-body row">
                <PaperFilter/>
                <Paper paperId={ paperId }/>
            </div>
            <LoginModal/>
            <ReplyModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = (dispatch, props) => ({ // eslint-disable-line
    changeRoute,
});
let PagePaper;

UI_PagePaper.propTypes = {
    params: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    current: PropTypes.string,
};

PagePaper = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PagePaper);

export default PagePaper;