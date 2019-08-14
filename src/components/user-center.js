import React, { memo, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    updateTimestamp,
    logout,
} from 'actions';
import {
    ajaxAction,
    stanAlert,
    stanLoading,
    ModulePager,
    ModuleClockShow,
} from 'lib';
import config from 'config';

const UserComment = memo(function Mod() {
    const [msg, setMsg] = useState({
        count: 0,
        page: 1,
        rows: [],
    });
    const {
        count,
        page,
        rows,
    } = msg;
    const pagerData = {
        current: page,
        dataCount: count,
    };
    const getMessage = jsonData => {
        const successFunc = function(result) {
            if (result.success) {
                setMsg(result.data);
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

        ajaxAction('message.page', jsonData, successFunc, failFunc);
    };

    useEffect(() => {
        getMessage({
            page: 1
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="col-xs-12 col-md-8 user-comment">
            <div className="comment-title">
                My Messages
            </div>
            <div className={ count === 0 ? 'comment-content empty' : 'comment-content' }>
                {
                    count === 0 ? 'message list is empty!' : (
                        rows.map((msgItem, idx) => {
                            let msgNo = (page - 1) * 10 + idx + 1;
                            let msgItemClassArr = [
                                'message-item',
                                'paper-reply',
                            ];

                            if (!msgItem.isRead) {
                                msgItemClassArr.push('unread');
                            }

                            if (msgNo < 10) {
                                msgNo = `0${msgNo}`;
                            }

                            return (
                                <div
                                    data-no={ msgNo }
                                    key={ `message_item_${msgItem.id}` }
                                    className={ msgItemClassArr.join(' ') }
                                >
                                    <a
                                        href={ `/paper/${msgItem.paperId}` }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        { msgItem.content }
                                    </a>
                                </div>
                            );
                        })
                    )
                }
            </div>
            {
                count !== 0 ?
                    <ModulePager jumpHandler={ getMessage } data={ pagerData }/> :
                    null
            }
        </div>
    );
}, (prevProps, nextProps) => Boolean('CONSTANT_PROPS')); // eslint-disable-line
const UserAd = memo(function Mod() {
    return (
        <div id="advertise_user" className="col-xs-12 col-md-4 user-ad">
            <ModuleClockShow/>
        </div>
    );
}, (prevProps, nextProps) => Boolean('CONSTANT_PROPS')); // eslint-disable-line
const UserInfo = function(props) {
    const { userInfo } = props;

    return (
        <div className="col-xs-12 col-md-8 user-info">
            <div className="user-info-item">
                <div className="user-info-title">
                    Register Mail
                </div>
                <div className="user-info-content">
                    { userInfo.email }
                </div>
            </div>
            <div className="user-info-item">
                <div className="user-info-title">
                    Register Date
                </div>
                <div className="user-info-content">
                    { userInfo.gmtCreate }
                </div>
            </div>
            <div className="user-info-item">
                <div className="user-info-title">
                    Register Ip
                </div>
                <div className="user-info-content">
                    { userInfo.registerIp }
                </div>
            </div>
        </div>
    );
};
const UserOverview = function(props) {
    const { timestamp, userInfo } = props;
    const genderMap = [
        'venus',
        'mars',
        'transgender',
    ];
    const genderClass = `user-gender fa fa-${genderMap[userInfo.gender || 1]}`;
    const defaultAvatarLink = `${config.ossPublic.user}/default.jpg`;
    const avatarLink = `${config.ossPublic.user}/${userInfo.uuid}.jpg?${timestamp}`;
    const $userAvatar = useRef(null);
    const editInfoHandler = (evt) => { // eslint-disable-line
        $('#editInfoModal').modal();
    };
    const editPwdHandler = (evt) => { // eslint-disable-line
        document.querySelector('#editPwdForm').reset();

        $('#editPwdModal').modal();
    };
    const resetPwdHandler = (evt) => { // eslint-disable-line
        const successFunc = function(result) {
            if (result.success) {
                stanAlert({
                    type: 'success',
                    content: result.message,
                    textAlign: 'center',
                    shownExpires: 0.75,
                });

                setTimeout(() => {
                    logout();
                }, 1500);
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

        ajaxAction('user.resetPwd', {}, successFunc, failFunc);
    };
    const activateAccount = evt => { // eslint-disable-line
        const successFunc = function(result) {
            if (result.success) {
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
            stanAlert({
                title: 'Warning!',
                content: err.toString(),
            });
            console.info(err); // eslint-disable-line
        };

        ajaxAction('user.sendActivateMail', {}, successFunc, failFunc);
    };
    const avatarErrHandler = (evt) => { // eslint-disable-line
        $userAvatar.current.setAttribute('src', defaultAvatarLink);
    };
    const avatarChangeHandler = (evt) => { // eslint-disable-line
        const jsonData = new FormData(document.querySelector('#avatarForm'));
        const successFunc = function(result) {
            stanLoading('hide');
            if (result.success) {
                updateTimestamp();
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

    return (
        <div className="col-xs-12 col-md-4 user-overview">
            <div className="overview-container">
                <div className="avatar-container">
                    <form
                        id="avatarForm"
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <img
                            className="avatar-content"
                            src={ (userInfo.id && userInfo.uuid && userInfo.email) ? avatarLink : defaultAvatarLink }
                            onError={ event => avatarErrHandler(event) }
                            ref={ $userAvatar }
                        />
                        <label htmlFor="avatarInput" className="edit-icon-container">
                            <i className="fa fa-edit"></i>
                        </label>
                        <input
                            className="hidden"
                            name="type"
                            defaultValue="USER_AVATAR"
                            type="text"
                        />
                        <input
                            className="hidden"
                            name="fileType"
                            defaultValue="image"
                            type="text"
                        />
                        <input
                            id="avatarInput"
                            type="file"
                            accept="image/jpg,image/jpeg,image/gif,image/png,image/bmp"
                            className="hidden"
                            onChange={ event => avatarChangeHandler(event) }
                            name="file"
                        />
                    </form>
                </div>
                <div className="info-container">
                    <div className="user-name">
                        <i className={ genderClass }></i>
                        { userInfo.userName }
                    </div>
                    {
                        userInfo.isEnabled ? (
                            <div className="account-activated">
                                <span className="activated-tips activated">
                                    Activated
                                </span>
                            </div>
                        ) : (
                            <div className="account-activated">
                                <a
                                    className="send-activate-mail-link"
                                    href="javascript:;"
                                    onClick={ event => activateAccount(event) }
                                >
                                    click to activate account
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="operate-container">
                <a className="operate-link" onClick={ event => editInfoHandler(event) }>
                    Edit Info
                </a>
                &nbsp;|&nbsp;
                <a className="operate-link" onClick={ event => editPwdHandler(event) }>
                    Edit Pwd
                </a>
                &nbsp;|&nbsp;
                <a className="operate-link" onClick={ event => resetPwdHandler(event) }>
                    Reset Pwd
                </a>
            </div>
        </div>
    );
};
const UI_UserCenter = function(props) {
    const { timestamp, userInfo } = props;

    return (
        <div className="user-center row no-gutters">
            <UserOverview timestamp={ timestamp } userInfo={ userInfo }/>
            <UserInfo userInfo={ userInfo }/>
            <UserAd/>
            <UserComment/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let UserCenter;

UserComment.propTypes = {
    userInfo: PropTypes.object,
};
UserInfo.propTypes = {
    userInfo: PropTypes.object,
};
UserOverview.propTypes = {
    timestamp: PropTypes.number,
    userInfo: PropTypes.object,
};
UI_UserCenter.propTypes = {
    timestamp: PropTypes.number,
    userInfo: PropTypes.object,
};

UserCenter = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_UserCenter);

export default UserCenter;