import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    PaperReply,
} from 'components';
import {
    stanAlert,
    ajaxAction,
    markdown,
} from 'lib';

import 'plugins/img-viewer/index.js';

const UI_Paper = function(props) {
    const {
        paperId,
        userInfo,
        timestamp
    } = props;
    const [paper, setPaper] = useState({});
    const getPaper = jsonData => {
        const successFunc = function(result) {
            if (result.success) {
                setPaper(result.data);
            } else {
                stanAlert({
                    title: 'Warning!',
                    content: result.message,
                });
            }
        };
        const failFunc = function(err) {
            stanAlert({
                title: 'Warning!',
                content: err.toString(),
            });
            console.info(err); // eslint-disable-line
        };

        ajaxAction('paper.detail', jsonData, successFunc, failFunc);
    };
    const initImgClass = paperInnerHTML => {
        let $paperContainer = document.createElement('div');

        $paperContainer.innerHTML = paperInnerHTML;
        $paperContainer = $($paperContainer);
        $paperContainer.find('img').each(function() {
            const typeReg = /\?type=/;
            const imgSrc = $(this).prop('src');
            const imgAlt = $(this).prop('alt');

            $(this).attr({
                'data-src': imgSrc,
                'data-caption': imgAlt,
            });

            if (!typeReg.test(imgSrc)) {
                $(this).addClass('default');
            } else {
                $(this).addClass(imgSrc.split(typeReg)[1] || '');
            }
        });

        return $paperContainer.prop('innerHTML');
    };
    const initImgViewer = () => {
        $('.paper-body img.default').magnify({
            title: true,
            headToolbar: [
                'close'
            ],
            footToolbar: [
                'zoomIn',
                'zoomOut',
                'actualSize',
                'rotateRight'
            ],
            initMaximized: true,
            zIndex: 999999,
        });
    };

    useEffect(() => {
        if (paperId !== paper.id) {
            getPaper({
                paperId,
            });
        }

        initImgViewer();
    }, [paperId, paper.id]);

    if (paper && paper.title && paper.gmtCreate && paper.tag && paper.content) {
        const paperTitle = paper.title;
        const dateVal = paper.gmtCreate.slice(0, 10);
        const tagVal = `${paper.tag}${paper.subtag ? `，${paper.subtag}` : ''}`;
        const paperBody = initImgClass(markdown(paper.content));

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
                        paperId={ paperId }
                        userInfo={ userInfo }
                        timestamp={ timestamp }
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
const mapDispatch2Props = () => ({});
let Paper;

UI_Paper.propTypes = {
    timestamp: PropTypes.number,
    paperId: PropTypes.number,
    userInfo: PropTypes.object,
};

Paper= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_Paper);

export default Paper;