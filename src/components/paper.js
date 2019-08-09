import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    PaperReply,
} from 'components';
import {
    markdown,
} from 'lib';

const UI_Paper = function(props) {
    const { paper, userInfo } = props;

    useEffect(() => {
        window.onresize = function() {
            const currentViewWidth = document.body.offsetWidth;

            if (currentViewWidth >= 767) {
                $('.filter-container').css('display', 'block');
            } else {
                $('.page-section-body').removeClass('filter-expand');
                $('.filter-container').css('display', 'none');
            }
        };
    }, []);

    if (paper && paper.title && paper.gmtCreate && paper.tag && paper.content) {
        const paperTitle = paper.title;
        const dateVal = paper.gmtCreate.slice(0, 10);
        const tagVal = `${paper.tag}${paper.subtag ? `，${paper.subtag}` : ''}`;
        const paperBody = markdown(paper.content);

        return (
            <div className="paper-container col-xs-12 col-md-8 col-lg-9">
                <div className="paper-content">
                    <div className="paper-title">
                        { paperTitle }
                    </div>
                    <div className="paper-subtitle">
                        <div className="subtitle-tags pull-right">
                            <i className="fa fa-tags"></i>
                            &nbsp;
                            <span className="tags-val">
                                { tagVal }
                            </span>
                        </div>
                        <div className="subtitle-date pull-right">
                            <i className="fa fa-calendar"></i>
                            &nbsp;
                            <span className="date-val">
                                { dateVal }
                            </span>
                        </div>
                    </div>
                    <hr/>
                    <div className="paper-body" dangerouslySetInnerHTML={{ __html: paperBody }}></div>
                    <hr/>
                    <PaperReply
                        paperId={ paper.id }
                        resetReplyForm={ props.resetReplyForm }
                        deleteReply={ props.deleteReply }
                        cache={ props.cache }
                    />
                </div>
                {
                    userInfo.isOwner ? (
                        <a className="edit-paper-link" href={ `/admin/edit-paper/${paper.id}` }>
                            <i className="fa fa-edit"></i>
                        </a>
                    ) : null
                }
            </div>
        );
    } else {
        return null;
    }
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({
    getPaper: () => null,
    resetReplyForm: () => null,
    deleteReply: () => null,
});
let Paper;

UI_Paper.propTypes = {
    paper: PropTypes.object,
    userInfo: PropTypes.object,
};

Paper= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_Paper);

export default Paper;