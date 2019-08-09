import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    stanAlert,
    stanLoading,
    ajaxAction,
    selectContent,
} from 'lib';
import config from 'config';

const Header = function() {
    return (
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
    );
};
const Body = function() {
    const [history, setHistory] = useState([]);
    const initCDNInfoLink = evt => {
        const $cdnInfoLink = $(evt.target).closest('.cdn-info-link');

        if (!$cdnInfoLink.attr('aria-describedby')) {
            $cdnInfoLink.popover('show');
        }
    };
    const changeHandler = evt => { // eslint-disable-line
        const _this = this;
        const requestUrl = '/util/upload-file';
        const jsonData = new FormData(document.querySelector('#uploadForm'));
        const successFunc = function(result) {
            stanLoading('hide');
            if (result.success) {
                const history = (_this.state.history || []).slice(0);

                history.push({
                    originalFileName: result.data.originalFileName,
                    fileName: result.data.fileName
                });
                setHistory(history);
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
        ajaxAction(requestUrl, jsonData, successFunc, failFunc, options);
    };

    useEffect(() => {
        $('.cdn-info-wrap').on('click', function(evt) {
            selectContent(evt.target);
        });

        $('#uploadModal .cdn-info-link').each(function() {
            $(this).popover({
                template: ('' +
                    `<div class="popover" role="tooltip">
                        <div class="arrow"></div>
                        <h3 class="popover-header"></h3>
                        <div class="popover-body cdn-info-wrap"></div>
                    </div>`)
            });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(history)]);

    return (
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
                                <div className="original-name">{ item.originalFileName }</div>
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
    );
};
const UI_UploadModal = function() {
    return (
        <div
            id="uploadModal"
            className="common-modal modal fade"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <Header/>
                    <Body/>
                </div>
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer;  //  eslint-disable-line
const mapDispatch2Props = () => ({
    uploadFile: () => null,
});
let UploadModal;

UploadModal= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_UploadModal);

export default UploadModal;