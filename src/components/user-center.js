import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    stanAlert,
    ModulePager,
    ModuleClockShow,
} from 'lib';
import config from 'config';

const UserComment = function(props) {
    const { message, getMessage } = props;
    const msg = message || {};
    const page = msg.page || 1;
    const msgCount = msg.count || 0;
    const msgArr = msg.rows || [];

    useEffect(() => {
        getMessage({
            page: 1
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="col-xs-12 col-md-8 user-comment">
            <div className="comment-title">My Messages</div>
            <div className={ msgCount === 0 ? 'comment-content empty' : 'comment-content' }>
                {
                    msgCount === 0 ? 'message list is empty!' : (
                        msgArr.map((msgItem, idx) => {
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
                msgCount !== 0 ?
                    <ModulePager jumpHandler={ getMessage } data={ message }/> :
                    null
            }
        </div>
    );
};
const UserAd = function() {
    return (
        <div id="advertise_user" className="col-xs-12 col-md-4 user-ad">
            <ModuleClockShow/>
        </div>
    );
};
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
const OperateContainer = function(props) {
    const editInfo = (evt) => { // eslint-disable-line
        const { userInfo } = props;
        const $editInfoModal = $('#editInfoModal');

        $editInfoModal.modal();
        $editInfoModal.find('[name=userName]').val(userInfo.userName);
        $editInfoModal.find(`[name=gender][value=${userInfo.gender}]`).prop('checked', true);

        props.updateUserInfoForm({
            userName: userInfo.userName,
            gender: userInfo.gender,
        });
    };
    const editPwd = (evt) => { // eslint-disable-line
        document.querySelector('#editPwdForm').reset();
        $('#editPwdModal').modal();
    };
    const resetPwd = (evt) => { // eslint-disable-line
        props.resetPwd();
    };

    return (
        <div className="operate-container">
            <a className="operate-link" onClick={ event => editInfo(event) }>
                Edit Info
            </a>
            &nbsp;|&nbsp;
            <a className="operate-link" onClick={ event => editPwd(event) }>
                Edit Pwd
            </a>
            &nbsp;|&nbsp;
            <a className="operate-link" onClick={ event => resetPwd(event) }>
                Reset Pwd
            </a>
        </div>
    );
};
const InfoContainer = function(props) {
    const genderMap = [
        'mars',
        'venus',
        'transgender',
    ];
    const { userInfo, sendActivateMail } = props;
    const genderClass = `user-gender fa fa-${genderMap[userInfo.gender || 0]}`;
    const activateAccount = evt => { // eslint-disable-line
        sendActivateMail();
    };

    return (
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
    );
};
const AvatarContainer = function(props) {
    const { userInfo } = props;
    // const defaultAvatarLink = `${config.ossPublic.user}/default.jpg?${Date.parse(new Date())}`;
    const avatarLink = `${config.ossPublic.user}/${userInfo.uuid}.jpg?${Date.parse(new Date())}`;
    const errHandler = (evt) => { // eslint-disable-line

    };
    const changeHandler = (evt) => { // eslint-disable-line

    };

    return (
        <div className="avatar-container">
            <form
                id="avatarForm"
                method="POST"
                encType="multipart/form-data"
            >
                <img
                    className="avatar-content"
                    src={ avatarLink }
                    onError={ event => errHandler(event) }
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
                    onChange={ event => changeHandler(event) }
                    name="file"
                />
            </form>
        </div>
    );
};
const UserOverview = function(props) {
    const {
        userInfo,
        sendActivateMail,
        updateUserInfoForm,
        resetPwd,
    } = props;

    return (
        <div className="col-xs-12 col-md-4 user-overview">
            <div className="overview-container">
                <AvatarContainer userInfo={ userInfo }/>
                <InfoContainer userInfo={ userInfo } sendActivateMail={ sendActivateMail }/>
            </div>
            <OperateContainer
                userInfo={ userInfo }
                updateUserInfoForm={ updateUserInfoForm }
                resetPwd={ resetPwd }
            />
        </div>
    );
};
const UI_UserCenter = function(props) {
    const {
        cache,
        userInfo,
        message,
        updateUserInfoForm,
        sendActivateMail,
        getMessage,
        resetPwd,
    } = props;
    const isLogin = Boolean(cache.isLogin);

    useEffect(() => {
        if (isLogin) {
            setTimeout(() => {
                stanAlert({
                    type: 'success',
                    content: 'please login,ready to home page...',
                    textAlign: 'center',
                    shownExpires: 1,
                });

                setTimeout(() => {
                    location.href='/';
                }, 1000);
            }, 1000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="user-center row no-gutters">
            <UserOverview
                userInfo={ userInfo }
                updateUserInfoForm={ updateUserInfoForm }
                sendActivateMail={ sendActivateMail }
                resetPwd={ resetPwd }
            />
            <UserInfo userInfo={ userInfo }/>
            <UserAd/>
            <UserComment message={ message } getMessage={ getMessage }/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({
    updateUserInfoForm: () => null,
    sendActivateMail: () => null,
    resetPwd: () => null,
    getMessage: () => null,
});
let UserCenter;

UserComment.propTypes = {
    message: PropTypes.object,
    getMessage: PropTypes.func.isRequired,
};
UserInfo.propTypes = {
    userInfo: PropTypes.object,
};
OperateContainer.propTypes = {
    userInfo: PropTypes.object,
    updateUserInfoForm: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired,
};
InfoContainer.propTypes = {
    userInfo: PropTypes.object,
    sendActivateMail: PropTypes.func.isRequired,
};
AvatarContainer.propTypes = {
    userInfo: PropTypes.object,
};
UserOverview.propTypes = {
    userInfo: PropTypes.object,
    sendActivateMail: PropTypes.func.isRequired,
    updateUserInfoForm: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired,
};
UI_UserCenter.propTypes = {
    updateUserInfoForm: PropTypes.func.isRequired,
    sendActivateMail: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired,
    getMessage: PropTypes.func.isRequired,
    userInfo: PropTypes.object,
    message: PropTypes.object,
    cache: PropTypes.object,
};

UserCenter = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_UserCenter);

export default UserCenter;