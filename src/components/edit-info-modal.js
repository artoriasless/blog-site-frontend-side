import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateUserInfo } from 'actions';
import { stanAlert } from 'lib';

const submitValidate = formData => {
    const alertInfo = {
        title: 'Warning!',
        userName: {
            null: 'please type your user name!',
            illegal: 'the user name can\'t exceed 15 characters in length!',
        },
    };

    if (!formData.userName) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.userName.null,
        });

        return false;
    } else if (formData.userName.length > 15) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.userName.illegal,
        });

        return false;
    }

    return true;
};

const Header = memo(function Mod() {
    return (
        <div className="modal-header">
            <h5 className="modal-title">
                Edit User Info
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
}, (prevProps, nextProps) => Boolean('CONSTANT_PROPS')); // eslint-disable-line
const Body = function(props) {
    const {
        userInfoForm,
        setUserInfoForm,
        submitForm,
    } = props;
    const formChangeHandler = (evt, key) => {
        const tmpUserInfo = Object.assign({}, userInfoForm);

        tmpUserInfo[key] = evt.target.value.trim();
        tmpUserInfo[key] = key === 'gender' ? Number(tmpUserInfo[key]) : tmpUserInfo[key];
        setUserInfoForm(tmpUserInfo);
    };
    const enterSubmitHandler = evt => {
        if (evt.keyCode === 13) {
            evt.preventDefault();

            submitForm();
        }
    };

    return (
        <div className="modal-body">
            <form id="editInfoForm">
                <div className="form-group">
                    <label htmlFor="editInfo_userName">
                        user name
                    </label>
                    <input
                        id="editInfo_userName"
                        className="form-control"
                        type="text"
                        placeholder="type your user name"
                        name="userName"
                        value={ userInfoForm.userName }
                        onChange={ event => formChangeHandler(event, 'userName') }
                        onKeyDown={ event => enterSubmitHandler(event) }
                    />
                </div>
                <div className="form-group">
                    <label>
                        gender
                    </label>
                    <div className="gender-radio-contaienr">
                        <div className="stan-radio-container">
                            <label className="stan-radio">
                                <i className="fa fa-venus"></i>
                                Female
                                <input
                                    className="stan-radio-input"
                                    type="radio"
                                    name="gender"
                                    value="0"
                                    defaultChecked={ userInfoForm.gender === 0 }
                                    onChange={ event => formChangeHandler(event, 'gender') }
                                />
                                <div className="stan-radio-indicator"></div>
                            </label>
                        </div>
                        <div className="stan-radio-container">
                            <label className="stan-radio">
                                <i className="fa fa-mars"></i>
                                Male
                                <input
                                    className="stan-radio-input"
                                    type="radio"
                                    name="gender"
                                    value="1"
                                    defaultChecked={ userInfoForm.gender === 1 }
                                    onChange={ event => formChangeHandler(event, 'gender') }
                                />
                                <div className="stan-radio-indicator"></div>
                            </label>
                        </div>
                        <div className="stan-radio-container">
                            <label className="stan-radio">
                                <i className="fa fa-transgender"></i>
                                Transgender
                                <input
                                    className="stan-radio-input"
                                    type="radio"
                                    name="gender"
                                    value="2"
                                    defaultChecked={ userInfoForm.gender === 2 }
                                    onChange={ event => formChangeHandler(event, 'gender') }
                                />
                                <div className="stan-radio-indicator"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
const Footer = function(props) {
    const { submitForm } = props;

    return (
        <div className="modal-footer">
            <a className="btn btn-primary submit-btn" onClick={ event => submitForm(event) }>
                Submit
            </a>
        </div>
    );
};
const UI_EditInfoModal = function(props) {
    const { userInfo } = props;
    const [userInfoForm, setUserInfoForm] = useState({
        userName: userInfo.userName,
        gender: userInfo.gender
    });
    const submitForm = (evt) => { // eslint-disable-line
        const jsonData = userInfoForm;

        if (submitValidate(jsonData)) {
            updateUserInfo(jsonData);
        }
    };

    return (
        <div
            id="editInfoModal"
            className="common-modal modal fade"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <Header/>
                    <Body
                        userInfoForm={ userInfoForm }
                        setUserInfoForm={ setUserInfoForm }
                        submitForm={ submitForm }
                    />
                    <Footer submitForm={ submitForm }/>
                </div>
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let EditInfoModal;

Body.propTypes = {
    userInfoForm: PropTypes.object,
    setUserInfoForm: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
};
Footer.propTypes = {
    submitForm: PropTypes.func.isRequired,
};
UI_EditInfoModal.propTypes = {
    userInfo: PropTypes.object,
};

EditInfoModal = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_EditInfoModal);

export default EditInfoModal;