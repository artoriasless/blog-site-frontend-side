import React, { memo, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    stanAlert,
    stanLoading,
    ajaxAction,
    markdown,
    selectContent,
} from 'lib';
import config from 'config';

const submitValidate = (submitType, formData) => {
    const title = 'Warning!';
    const alertInfo = {
        id: {
            null: 'paper id can\'t be null while editing paper!',
            illegal: 'paper id must be digital value!',
        },
        title: {
            null: 'paper title can\'t be null!',
        },
        tag: {
            null: 'paper tag can\'t be null!',
        },
        brief: {
            null: 'paper brief can\'t be null!',
        },
        content: {
            null: 'paper content can\'t be null!',
        },
    };

    if (submitType === 'EDIT') {
        if (!formData.id) {
            stanAlert({
                title,
                content: alertInfo.id.null,
            });

            return false;
        }
        if (isNaN(Number(formData.id))) {
            stanAlert({
                title,
                content: alertInfo.id.illegal,
            });

            return false;
        }
    }

    if (!formData.title) {
        stanAlert({
            title,
            content: alertInfo.title.null,
        });

        return false;
    }

    if (!formData.tag) {
        stanAlert({
            title,
            content: alertInfo.tag.null,
        });

        return false;
    }

    if (!formData.brief) {
        stanAlert({
            title,
            content: alertInfo.brief.null,
        });

        return false;
    }

    if (!formData.content) {
        stanAlert({
            title,
            content: alertInfo.content.null,
        });

        return false;
    }

    return true;
};

const UploadModal = memo(function Mod() {
    const [history, setHistory] = useState([]);
    const initCDNInfoLink = evt => {
        const $cdnInfoLink = $(evt.target).closest('.cdn-info-link');

        $cdnInfoLink.popover({
            template: ('' +
                `<div class="popover" role="tooltip">
                    <div class="arrow"></div>
                    <h3 class="popover-header"></h3>
                    <div class="popover-body cdn-info-wrap"></div>
                </div>` +
            '')
        });

        if (!$cdnInfoLink.attr('aria-describedby')) {
            $cdnInfoLink.popover('show');
        }
    };
    const changeHandler = evt => { // eslint-disable-line
        const jsonData = new FormData(document.querySelector('#uploadForm'));
        const successFunc = function(result) {
            stanLoading('hide');
            if (result.success) {
                const newHistory = history.slice(0);

                newHistory.push({
                    originalFileName: result.data.originalFileName,
                    fileName: result.data.fileName
                });
                setHistory(newHistory);
                stanAlert({
                    type: 'success',
                    content: result.message,
                    textAlign: 'center',
                    shownExpires: 0.75,
                });
            } else {
                stanAlert({
                    title: 'Warning!',
                    content: result.message,
                });
            }
        };
        const failFunc = function(err) {
            stanLoading('hide');
            stanAlert({
                title: 'Warning!',
                content: err.toString(),
            });
            console.info(err); // eslint-disable-line
        };
        const options = {
            cache: false,
            processData: false,
            contentType: false,
        };

        stanLoading();
        ajaxAction('util.uploadFile', jsonData, successFunc, failFunc, options);
    };

    useEffect(() => {
        $('body').on('click', '.cdn-info-wrap', function(evt) {
            selectContent(evt.target);
        });
    }, []);

    return (
        <div
            id="uploadModal"
            className="common-modal modal fade"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Upload File(s)/Image(s)
                        </h5>
                        <a
                            className="btn close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="modal-body">
                        <div className="upload-form">
                            <form
                                id="uploadForm"
                                method="POST"
                                encType="multipart/form-data"
                            >
                                <label htmlFor="uploadInput" className="upload-icon-container">
                                    <i className="fa fa-file"></i>
                                </label>
                                <input
                                    className="hidden"
                                    name="type"
                                    defaultValue="PAPER_MATERIAL"
                                    type="text"
                                />
                                <input
                                    id="uploadInput"
                                    type="file"
                                    accept="*"
                                    className="hidden"
                                    onChange={ event => changeHandler(event) }
                                    name="file"
                                />
                            </form>
                        </div>
                        <div className="upload-history">
                            <div className="history-title">
                                Upload History
                            </div>
                            <ul className="history-list">
                                {
                                    history.map((item, index) => (
                                        <li className="history-item" key={ item.fileName + index }>
                                            <div className="original-name">
                                                { item.originalFileName }
                                            </div>
                                            <div
                                                className="cdn-info-link"
                                                data-content={ (config.ossPublic.domain + '/' + item.fileName).replace(/\/+/g, '/') }
                                                onClick={ event => initCDNInfoLink(event) }
                                            >
                                                <i className="fa fa-link"></i>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}, (prevProps, nextProps) => Boolean('CONSTANT_PROPS')); // eslint-disable-line
const PaperEditForm = function(props) {
    const { paperForm, setPaperForm } = props;
    const $paperBrief = useRef(null);
    const $paperContent = useRef(null);
    const formChangeHandler = (evt, key) => {
        const originalPaperForm = JSON.parse(JSON.stringify(paperForm));
        let val = evt.target.value || '';

        if (key !== 'brief' && key !== 'content') {
            val = val.trim();
        }

        originalPaperForm[key] = val;
        setPaperForm(originalPaperForm);
    };

    useEffect(() => {
        if (paperForm.brief && paperForm.brief !== $paperBrief.current.value) {
            $paperBrief.current.value = paperForm.brief;
        }

        if (paperForm.content && paperForm.content !== $paperContent.current.value) {
            $paperContent.current.value = paperForm.content;
        }
    });

    return (
        <>
            <div className="form-container col-xs-12 col-md-6">
                <form className="form-content">
                    <div className="form-group">
                        <input
                            id="paper_title"
                            className="form-control"
                            type="text"
                            placeholder="type paper title"
                            defaultValue={ paperForm.title }
                            onChange={ event => formChangeHandler(event, 'title') }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="paper_tag"
                            className="form-control"
                            type="text"
                            placeholder="type paper tag"
                            defaultValue={ paperForm.tag }
                            onChange={ event => formChangeHandler(event, 'tag') }
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="paper_subtag"
                            className="form-control"
                            type="text"
                            placeholder="type paper subtag(s)(splited by Chinese comma '，' between subtags)"
                            defaultValue={ paperForm.subtag }
                            onChange={ event => formChangeHandler(event, 'subtag') }
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            id="paper_brief"
                            className="form-control"
                            placeholder="type paper brief(one paragraph is enough)"
                            onChange={ event => formChangeHandler(event, 'brief') }
                            ref={ $paperBrief }
                        ></textarea>
                    </div>
                    <div className="form-group paper-content-container">
                        <textarea
                            id="paper_content"
                            className="form-control"
                            placeholder="type paper content(only support markdown syntax)"
                            onChange={ event => formChangeHandler(event, 'content') }
                            ref={ $paperContent }
                        ></textarea>
                    </div>
                </form>
            </div>
            <UploadModal/>
        </>
    );
};
const PaperEditPreview = function(props) {
    const { paperForm } = props;
    const paperBody = markdown(paperForm.content || '');

    return (
        <div className="preview-container col-xs-12 col-md-6">
            <div className="preview-content">
                <div className="preview-paper" dangerouslySetInnerHTML={{ __html: paperBody }}></div>
            </div>
        </div>
    );
};
const UI_PaperEdit = function(props) {
    const { paperId, pageType } = props;
    const [operateType, setOperateType] = 'editing';
    const [paperForm, setPaperForm] = useState((() => {
        const _form_ = {
            title: '',
            tag: '',
            subtag: '',
            brief: '',
            content: '',
        };

        if (_form_.paperId) {
            _form_.id = paperId;
        }

        return _form_;
    })());
    const getPaper = jsonData => {
        const successFunc = function(result) {
            if (result.success) {
                setPaperForm({
                    id: result.data.id,
                    title: result.data.title,
                    tag: result.data.tag,
                    subtag: result.data.subtag,
                    brief: result.data.brief,
                    content: result.data.content
                });
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
    const toggleEditPreview = evt => { // eslint-disable-line
        const target = operateType === 'editing' ? 'preview' : 'editing';

        setOperateType(target);
    };
    const showUploadModal = evt => { // eslint-disable-line
        $('#uploadModal').modal();
    };
    const savePaper = evt => { // eslint-disable-line
        const jsonData = Object.assign({}, paperForm);
        const successFunc = function(result) {
            if (result.success) {
                stanAlert({
                    type: 'success',
                    content: result.message,
                    textAlign: 'center',
                    shownExpires: 0.75,
                });

                setTimeout(function() {
                    window.location.href = `/paper/${result.data.id}`;
                }, 2000);
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
            console.info(err);  //  eslint-disable-line
        };
        let reqName;

        jsonData.title = jsonData.title.trim();
        jsonData.tag = jsonData.tag.trim();
        jsonData.subtag = jsonData.subtag.trim();
        jsonData.brief = jsonData.brief.trim();
        jsonData.content = jsonData.content.trim();

        if (submitValidate(pageType, jsonData)) {
            switch(pageType) {
            case 'ADD':
                reqName = 'admin.paper.create';
                break;
            case 'EDIT':
                reqName = 'admin.paper.update';
                break;
            default:
                // de nothing
            }

            ajaxAction(reqName, jsonData, successFunc, failFunc);
        }
    };

    useEffect(() => {
        if (pageType === 'EDIT') {
            getPaper({
                paperId,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={ `page-section-body row ${operateType}` }>
            <a
                className={ `toggle-edit-preview ${operateType}` }
                href="javascript:;"
                onClick={ event => toggleEditPreview(event) }
            >
                <i className="fa fa-edit"></i>
                <i className="fa fa-eye"></i>
            </a>
            <PaperEditForm paperForm={ paperForm } setPaperForm={ setPaperForm }/>
            <PaperEditPreview paperForm={ paperForm }/>
            <a
                className="show-upload-modal-link"
                href="javascript:;"
                onClick={ event => showUploadModal(event) }
            >
                <i className="fa fa-upload"></i>
            </a>
            <a
                className="submit-paper-link"
                href="javascript:;"
                onClick={ event => savePaper(event) }
            >
                <i className="fa fa-save"></i>
            </a>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PaperEdit;

PaperEditForm.propTypes = {
    paperForm: PropTypes.object,
    setPaperForm: PropTypes.func
};
PaperEditPreview.propTypes = {
    paperForm: PropTypes.object
};
UI_PaperEdit.propTypes = {
    paperId: PropTypes.number,
    pageType: PropTypes.string
};

PaperEdit = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PaperEdit);

export default PaperEdit;