import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Navbar,
    LoginModal,
    PaperEdit
} from 'components';
import {
    stanLoading,
    initSeo
} from 'lib';

const UI_PageEditPaper = function(props) {
    const { params } = props;
    const paperId = Number(params.paperId);
    const pageType = paperId ? 'EDIT' : 'ADD';

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
        <div className="page-edit-paper">
            <Navbar/>
            <PaperEdit paperId={ paperId } pageType={ pageType }/>
            <LoginModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PageEditPaper;

UI_PageEditPaper.propTypes = {
    params: PropTypes.object,
};

PageEditPaper = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageEditPaper);

export default PageEditPaper;