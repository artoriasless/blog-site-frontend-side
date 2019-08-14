import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Navbar,
    LoginModal,
    PaperFilter,
    Paper,
    ReplyModal
} from 'components';
import { stanLoading } from 'lib';

const UI_PagePaper = function(props) {
    const { params, userInfo } = props;
    const paperId = Number(params.paperId) || 0;

    useEffect(() => {
        stanLoading();

        window.onresize = function() {
            const currentViewWidth = document.body.offsetWidth;

            if (currentViewWidth >= 767) {
                $('.filter-container').css('display', 'block');
            } else {
                $('.page-section-body').removeClass('filter-expand');
                $('.filter-container').css('display', 'none');
            }
        };

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);
    }, []);

    return (
        <div className="page-paper">
            <Navbar/>
            <div className="page-section-body row">
                <PaperFilter/>
                <Paper paperId={ paperId } userInfo={ userInfo }/>
            </div>
            <LoginModal/>
            <ReplyModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PagePaper;

UI_PagePaper.propTypes = {
    userInfo: PropTypes.object,
    params: PropTypes.object.isRequired,
};

PagePaper = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PagePaper);

export default PagePaper;