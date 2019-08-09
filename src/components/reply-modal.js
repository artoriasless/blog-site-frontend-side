import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { stanAlert } from 'lib';

const Footer = function(props) {
    const submitValidate = (_type, _reply) => {
        const alertInfo = {
            title: 'Warning!',
            content: {
                null: 'please type the comment!',
            },
        };

        if (!_reply.content) {
            stanAlert({
                title: alertInfo.title,
                content: alertInfo.content.null,
            });

            return false;
        }

        return true;
    };
    const submitReply = (evt) => { // eslint-disable-line
        const { cache, addReply, editReply } = props;
        const reply = cache.reply || {};
        const type = reply.replyType;

        if (submitValidate(type, reply)) {
            if (type === 'ADD') {
                addReply(reply);
            } else if (type === 'EDIT') {
                editReply(reply);
            }
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
    const formChangeHandler = (evt) => { // eslint-disable-line
        const { cache, updateReplyForm } = props;
        const formData = cache.reply || {};

        updateReplyForm(formData);
    };

    return (
        <div className="modal-body">
            <form id="replyForm">
                <textarea
                    id="replyInput"
                    name="content"
                    placeholder="please type your comment here..."
                    onChange={ event => formChangeHandler(event) }
                ></textarea>
            </form>
        </div>
    );
};
const Header = function() {
    return (
        <div className="modal-header">
            <h5 className="modal-title">
                Add Your Comment
            </h5>
            <a
                className="btn close"
                data-dismiss="modal"
                aria-label="Close"
            >
                <i
                    className="fa fa-times"
                    aria-hidden="true"
                ></i>
            </a>
        </div>
    );
};
const UI_ReplyModal = function(props) {
    return (
        <div
            id="replyModal"
            className="common-modal modal fade"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <Header/>
                    <Body updateReplyForm={ props.updateReplyForm } cache={ props.cache }/>
                    <Footer
                        addReply={ props.addReply }
                        editReply={ props.editReply }
                        cache={ props.cache }
                    />
                </div>
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({
    updateReplyForm: () => null,
    addReply: () => null,
    editReply: () => null,
});
let ReplyModal;

Footer.propTypes = {
    addReply: PropTypes.func.isRequired,
    editReply: PropTypes.func.isRequired,
    cache: PropTypes.object,
};
Body.propTypes = {
    updateReplyForm: PropTypes.func.isRequired,
    cache: PropTypes.object,
};
UI_ReplyModal.propTypes = {
    updateReplyForm: PropTypes.func.isRequired,
    addReply: PropTypes.func.isRequired,
    editReply: PropTypes.func.isRequired,
    cache: PropTypes.object,
};

ReplyModal = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_ReplyModal);

export default ReplyModal;