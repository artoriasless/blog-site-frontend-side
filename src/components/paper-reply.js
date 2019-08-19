import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    ReplyModal
} from 'components';
import {
    stanAlert,
    stanConfirm,
    ajaxAction
} from 'lib';
import config from 'config';

const UI_PaperReply = function(props) {
    const { paperId, userInfo } = props;
    const [reply, setReply] = useState({
        paperId: 0,
        replyList: [],
    });
    const [replyForm, setReplyForm] = useState({});
    const replyId2IdxMap = {};
    const userId2NameMap = {};
    const showLoginModal = evt => { // eslint-disable-line
        $('.navbar-collapse').collapse('hide');
        $('#loginModal').modal();
        document.querySelector('#registerForm').reset();
        document.querySelector('#loginForm').reset();
    };
    const avatarErrHandler = evt => {   //  eslint-disable-line
        const $userAvatar = evt.target;
        const defaultAvatarLink = `${config.ossPublic.user}/default.jpg}`;

        $userAvatar.setAttribute('src', defaultAvatarLink);
    };
    const deleteReply = formData => {
        const jsonData = Object.assign({}, formData);
        const successFunc = function(result) {
            if (result.success) {
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
            console.info(err); // eslint-disable-line
        };

        ajaxAction('reply.delete', jsonData, successFunc, failFunc);
    };
    const manageReply = (evt, formData) => { // eslint-disable-line
        const isLogin = userInfo && userInfo.id && userInfo.uuid && userInfo.email;

        if (isLogin) {
            setReplyForm(formData);

            switch(formData.replyType) {
            case 'ADD':
                $('.navbar-collapse').collapse('hide');
                $('#replyModal').modal();
                break;
            case 'EDIT':
                $('.navbar-collapse').collapse('hide');
                $('#replyModal').modal();
                break;
            case 'DELETE':
                $('.navbar-collapse').collapse('hide');
                stanConfirm({
                    title: 'Delete Confirm',
                    content: `are you sure to delete this reply : <br/> <strong>${formData.content}</strong>`,
                    confirm: () => {
                        deleteReply(formData);
                    }
                });
                break;
            default:
                // do nothing
            }
        } else {
            stanAlert({
                title: 'Warning!',
                content: 'Guest,please login first...',
                shownExpires: 1.5,
            });

            setTimeout(() => {
                showLoginModal();
            }, 1500);
        }
    };
    const getReply = jsonData => {
        const successFunc = function(result) {
            if (result.success) {
                setReply({
                    paperId: jsonData.paperId,
                    replyList: result.data
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

        ajaxAction('reply.list', jsonData, successFunc, failFunc);
    };

    useEffect(() => {
        if (paperId !== reply.paperId) {
            getReply({
                paperId,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paperId]);

    reply.replyList.forEach((replyItem, index) => {
        replyItem.editTag = (replyItem.userInfo.uuid === userInfo.uuid) && !replyItem.isDeleted;

        replyId2IdxMap[replyItem.id] = index;

        if (userId2NameMap[replyItem.userInfo.id] === undefined) {
            userId2NameMap[replyItem.userInfo.id] = replyItem.userInfo.userName;
        }

        return replyItem;
    });

    if (reply.replyList.length === 0) {
        return (
            <>
                <dl className="reply-container">
                    <dt className="reply-title">
                        Comments
                        <a
                            className="reply-operate reply"
                            href="javascript:;"
                            onClick={ event => manageReply(event, {
                                paperId: reply.paperId,
                                rootReplyId: 0,
                                replyId: 0,
                                replyLevel: 0,
                                replyType: 'ADD',
                                content: '',
                            }) }
                        >
                            <i className="fa fa-reply"></i>
                        </a>
                    </dt>
                    <dd className="no-reply-tips">
                        no comment now, be the first to reply
                    </dd>
                </dl>
                <ReplyModal
                    replyForm={ replyForm }
                    setReplyForm={ setReplyForm }
                    getReply={ getReply }
                />
            </>
        );
    } else {
        return (
            <>
                <dl className="reply-container">
                    <dt className="reply-title">
                        Comments
                        <a
                            className="reply-operate reply"
                            href="javascript:;"
                            onClick={ event => manageReply(event, {
                                paperId: reply.paperId,
                                rootReplyId: 0,
                                replyId: 0,
                                replyLevel: 0,
                                replyType: 'ADD',
                                content: '',
                            }) }
                        >
                            <i className="fa fa-reply"></i>
                        </a>
                    </dt>
                    {
                        reply.replyList.map((replyItem, index) => {
                            const key = `replyItem_${index}`;
                            const avatarSrc = `${config.ossPublic.user}/${replyItem.userInfo.uuid}.jpg?${Date.parse(new Date())}`;
                            const userName = replyItem.userInfo.userName;
                            const replyContent = replyItem.isDeleted === 0 ? replyItem.content : 'x this reply has been deleted';
                            const replyDate = replyItem.replyDate;
                            const replyToTag = replyItem.replyLevel !== 0;
                            const replyTo = replyItem.replyLevel !== 0 ?
                                userId2NameMap[reply.replyList[replyId2IdxMap[replyItem.replyId]].userInfo.id] :
                                '';
                            const ownerTag = replyItem.userInfo.uuid === userInfo.uuid &&
                                userInfo.uuid !== undefined;
                            const canDeleteTag = ownerTag && replyItem.isDeleted === 0;
                            const canEditTag = canDeleteTag;
                            const canReplyTag = replyItem.isDeleted === 0;

                            return (
                                <dd
                                    className={ `reply-item reply-level-${replyItem.replyLevel}` }
                                    key={ key }
                                    data-id={ replyItem.id }
                                    data-level={ replyItem.replyLevel }
                                    data-root={ replyItem.rootReplyId }
                                >
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            <img
                                                className="avatar-img"
                                                src={ avatarSrc }
                                                onError={ event => avatarErrHandler(event) }
                                            />
                                        </div>
                                        <div className="user-name">
                                            { userName }
                                            <i className={ replyToTag ? 'fa fa-share' : '' }></i>
                                            { replyTo }
                                        </div>
                                    </div>
                                    <div className={ `reply-content ${replyItem.isDeleted === 0 ? '' : 'deleted'}` }>
                                        { replyContent }
                                    </div>
                                    <div className="reply-addition">
                                        <div className="reply-date pull-left">
                                            { replyDate }
                                        </div>
                                        <div className="reply-operate-container pull-right">
                                            {
                                                canDeleteTag ? (
                                                    <a
                                                        className="reply-operate delete"
                                                        href="javascript:;"
                                                        onClick={ event => manageReply(event, {
                                                            paperId: reply.paperId,
                                                            id: replyItem.id,
                                                            replyType: 'DELETE',
                                                            content: replyContent,
                                                        }) }
                                                    >
                                                        <i className="fa fa-times"></i>
                                                    </a>
                                                ) : null
                                            }
                                            {
                                                canEditTag ? (
                                                    <a
                                                        className="reply-operate edit"
                                                        href="javascript:;"
                                                        onClick={ event => manageReply(event, {
                                                            paperId: reply.paperId,
                                                            id: replyItem.id,
                                                            replyType: 'EDIT',
                                                            content: replyContent,
                                                        }) }
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </a>
                                                ) : null
                                            }
                                            {
                                                canReplyTag ? (
                                                    <a
                                                        className="reply-operate reply"
                                                        href="javascript:;"
                                                        onClick={ event => manageReply(event, {
                                                            paperId: reply.paperId,
                                                            rootReplyId: replyItem.rootReplyId,
                                                            replyId: replyItem.id,
                                                            replyLevel: replyItem.replyLevel + 1,
                                                            replyType: 'ADD',
                                                            content: '',
                                                        }) }
                                                    >
                                                        <i className="fa fa-reply"></i>
                                                    </a>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                </dd>
                            );
                        })
                    }
                </dl>
                <ReplyModal
                    replyForm={ replyForm }
                    setReplyForm={ setReplyForm }
                    getReply={ getReply }
                />
            </>
        );
    }
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PaperReply;

UI_PaperReply.propTypes = {
    paperId: PropTypes.number,
    userInfo: PropTypes.object,
};

PaperReply = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PaperReply);

export default PaperReply;