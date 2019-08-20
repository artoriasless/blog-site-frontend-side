import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    stanAlert,
    ajaxAction
} from 'lib';

const submitValidate = reply => {
    const alertInfo = {
        title: 'Warning!',
        content: {
            null: 'please type the comment!',
        },
    };

    if (!reply.content) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.content.null,
        });

        return false;
    }

    return true;
};

const Footer = function(props) {
    const { replyForm, getReply } = props;
    const submitReply = evt => { // eslint-disable-line
        const jsonData = Object.assign({}, replyForm);
        const successFunc = function(result) {
            if (result.success) {
                $('#replyModal').modal('hide');

                getReply({
                    paperId: jsonData.paperId
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
            console.info(err);  //  eslint-disable-line
        };
        let reqName;

        jsonData.content = jsonData.content.trim();

        if (submitValidate(jsonData)) {
            switch(jsonData.replyType) {
            case 'ADD':
                reqName = 'reply.create';
                break;
            case 'EDIT':
                reqName = 'reply.update';
                break;
            default:
                // de nothing
            }

            ajaxAction(reqName, jsonData, successFunc, failFunc);
        }
    };

    return (
        <div className="modal-footer">
            <a className="btn btn-primary submit-btn" onClick={ event => submitReply(event) }>
                Submit
            </a>
        </div>
    );
};
const Body = function(props) {
    const { replyForm, setReplyForm } = props;
    const $replyInput = useRef(null);
    const formChangeHandler = evt => { // eslint-disable-line
        const FormData = Object.assign({}, replyForm);

        FormData.content = evt.target.value;
        setReplyForm(FormData);
    };

    useEffect(() => {
        if (JSON.stringify(replyForm) !== '{}') {
            $replyInput.current.value = replyForm.content;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [replyForm]);

    return (
        <div className="modal-body">
            <form id="replyForm">
                <textarea
                    id="replyInput"
                    name="content"
                    placeholder="please type your comment here..."
                    ref={ $replyInput }
                    onChange={ event => formChangeHandler(event) }
                ></textarea>
            </form>
        </div>
    );
};
const Header = function(props) {
    const replyForm = props.replyForm || {};
    let operate;

    switch(replyForm.replyType) {
    case 'ADD':
        operate = 'Add';
        break;
    case 'EDIT':
        operate = 'Update';
        break;
    default:
        operate = 'Add';
    }

    return (
        <div className="modal-header">
            <h5 className="modal-title">
                { operate } Your Comment
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
const UI_ReplyModal = function(props) {
    const {
        replyForm,
        setReplyForm,
        getReply
    } = props;

    return (
        <div
            id="replyModal"
            className="common-modal modal fade"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <Header replyForm={ replyForm }/>
                    <Body replyForm={ replyForm } setReplyForm={ setReplyForm }/>
                    <Footer replyForm={ replyForm } getReply={ getReply }/>
                </div>
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let ReplyModal;

Footer.propTypes = {
    replyForm: PropTypes.object,
    getReply: PropTypes.func
};
Body.propTypes = {
    replyForm: PropTypes.object,
    setReplyForm: PropTypes.func,
};
Header.propTypes = {
    replyForm: PropTypes.object,
};
UI_ReplyModal.propTypes = {
    replyForm: PropTypes.object,
    setReplyForm: PropTypes.func,
    getReply: PropTypes.func
};

ReplyModal = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_ReplyModal);

export default ReplyModal;