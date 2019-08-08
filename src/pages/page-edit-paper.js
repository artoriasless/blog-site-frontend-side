import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeRoute } from 'actions';
import {
    Navbar,
    LoginModal,
    PaperEdit,
    UploadModal
} from 'components';
import {
    getRoute,
    stanLoading
} from 'lib';

const UI_PageEditPaper = function(props) {
    const { params, current, changeRoute } = props;
    const paperId = params.paperId;
    const pageType = paperId ? 'EDIT' : 'ADD';

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
        <div className="page-edit-paper" key={ current }>
            <Navbar/>
            <PaperEdit paperId={ paperId } pageType={ pageType }/>
            <LoginModal/>
            <UploadModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = (dispatch, props) => ({ // eslint-disable-line
    changeRoute,
});
let PageEditPaper;

UI_PageEditPaper.propTypes = {
    current: PropTypes.string,
    changeRoute: PropTypes.func.isRequired,
    params: PropTypes.object,
};

PageEditPaper = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageEditPaper);

export default PageEditPaper;