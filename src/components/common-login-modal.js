import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    login,
    register
} from 'actions';
import {
    stanAlert,
    ajaxAction,
} from 'lib';

import 'plugins/switch-button/index.js';

const submitValidate = (formData, type) => {
    const emailReg = /^[^@]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;
    const pwdReg = /^\S{10,18}$/;
    const alertInfo = {
        title: 'Warning!',
        email: {
            null: 'please type the email address!',
            illegal: 'please type legal email address!',
        },
        password: {
            null: 'please type the password!',
            illegal: 'please type legal password!<br/>pwd length from 10 to 16.',
        },
        confirmPwd: {
            null: 'please retype the password to check!',
            illegal: 'the password to confirm is inconsistent!',
        },
    };

    if (!formData.email) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.email.null,
        });

        return false;
    } else if (!emailReg.test(formData.email)) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.email.illegal,
        });

        return false;
    } else if (!formData.password) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.password.null,
        });

        return false;
    } else if (!pwdReg.test(formData.password)) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.password.illegal,
        });

        return false;
    }
    //  如果是注册，需要再校验确认的模态框
    if (type === 'register') {
        if (!formData.confirmPwd) {
            stanAlert({
                title: alertInfo.title,
                content: alertInfo.confirmPwd.null,
            });

            return false;
        } else if (formData.password !== formData.confirmPwd) {
            stanAlert({
                title: alertInfo.title,
                content: alertInfo.confirmPwd.illegal,
            });

            return false;
        }
    }

    return true;
};
const resetPwdValidate = email => {
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    const alertInfo = {
        title: 'Warning!',
        email: {
            null: 'please type the email address!',
            illegal: 'please type legal email address!',
        },
    };

    if (!email) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.email.null
        });

        return false;
    } else if (!emailReg.test(email)) {
        stanAlert({
            title: alertInfo.title,
            content: alertInfo.email.illegal,
        });

        return false;
    }

    return true;
};

const Header = function() {
    return (
        <div className="modal-header">
            <h5 className="modal-title">
                Sign in or Sign up
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
const Body = function(props) {
    const {
        setSubmitType,
        loginForm,
        setLoginForm,
        registerForm,
        setRegisterForm,
        submitForm,
    } = props;
    const registerFormChangeHandler = (evt, key) => {
        const val = (evt.target.value || '').trim();
        const originalRegisterForm = JSON.parse(JSON.stringify(registerForm));

        originalRegisterForm[key] = val;
        setRegisterForm(originalRegisterForm);
    };
    const loginFormChangeHandler = (evt, key) => {
        const val = (evt.target.value || '').trim();
        const originalLoginForm = JSON.parse(JSON.stringify(loginForm));

        originalLoginForm[key] = val;
        setLoginForm(originalLoginForm);
    };
    const enterLoginHandler = evt => {
        if (evt.keyCode === 13) {
            submitForm();
        }
    };
    const enterRegisterHandler = evt => {
        if (evt.keyCode === 13) {
            submitForm();
        }
    };
    const resetPwdHandler = evt => { // eslint-disable-line
        const jsonData = {
            email: loginForm.email || ''
        };
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
            console.info(err);  //  eslint-disable-line
        };

        if (resetPwdValidate(jsonData.email)) {
            ajaxAction('user.resetPwd', jsonData, successFunc, failFunc);
        }
    };

    useEffect(() => {
        $('#switchBtn')
            .bootstrapToggle({
                on: 'Login',
                off: 'Register',
                onstyle: 'default',
                offstyle: 'default',
            })
            .change(function() {
                const checked = $(this).prop('checked');
                const tabLink = checked ? 'loginTabLink' : 'registerTabLink';
                const submitType = checked ? 'login' : 'register';

                $(`#sign_in_up_tab #${tabLink}`).tab('show');
                setSubmitType(submitType);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="modal-body">
            <div id="switch_In_Up_container">
                <input
                    id="switchBtn"
                    defaultChecked={ true }
                    type="checkbox"
                />
            </div>
            <ul id="sign_in_up_tab" className="nav">
                <li className="active">
                    <a
                        id="loginTabLink"
                        href="#content_login"
                        data-toggle="tab"
                    ></a>
                </li>
                <li>
                    <a
                        id="registerTabLink"
                        href="#content_register"
                        data-toggle="tab"
                    ></a>
                </li>
            </ul>
            <div className="tab-content">
                <div
                    id="content_login"
                    className="tab-pane fade show active"
                    role="tabpanel"
                >
                    <form id="loginForm">
                        <div className="form-group">
                            <label htmlFor="login_email">
                                email
                            </label>
                            <input
                                id="login_email"
                                className="form-control"
                                type="email"
                                placeholder="type your email"
                                onChange={ event => loginFormChangeHandler(event, 'email') }
                                onKeyDown={ event => enterLoginHandler(event) }
                            />
                        </div>
                        <div className="form-group">
                            <div>
                                <label htmlFor="login_password">
                                    password
                                </label>
                                <a
                                    className="reset-pwd-link"
                                    href="javascript:;"
                                    tabIndex="-1"
                                    onClick={ event => resetPwdHandler(event) }
                                >
                                    forget pwd?
                                </a>
                            </div>
                            <input
                                id="login_password"
                                className="form-control"
                                type="password"
                                placeholder="type your password"
                                onChange={ event => loginFormChangeHandler(event, 'password') }
                                onKeyDown={ event => enterLoginHandler(event) }
                            />
                        </div>
                    </form>
                </div>
                <div
                    id="content_register"
                    className="tab-pane fade"
                    role="tabpanel"
                >
                    <form id="registerForm">
                        <div className="form-group">
                            <label htmlFor="register_email">
                                email
                            </label>
                            <input
                                id="register_email"
                                className="form-control"
                                type="email"
                                placeholder="type your email"
                                onChange={ event => registerFormChangeHandler(event, 'email') }
                                onKeyDown={ event => enterRegisterHandler(event) }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register_password">
                                password
                            </label>
                            <input
                                id="register_password"
                                className="form-control"
                                type="password"
                                placeholder="type your password"
                                onChange={ event => registerFormChangeHandler(event, 'password') }
                                onKeyDown={ event => enterRegisterHandler(event) }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="register_confirmPwd">
                                password
                            </label>
                            <input
                                id="register_confirmPwd"
                                className="form-control"
                                type="password"
                                placeholder="confirm your password"
                                onChange={ event => registerFormChangeHandler(event, 'confirmPwd') }
                                onKeyDown={ event => enterRegisterHandler(event) }
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
const Footer = function(props) {
    const { submitForm } = props;

    return (
        <div className="modal-footer">
            <a className="btn btn-primary submit-btn" onClick={ () => submitForm() }>
                Submit
            </a>
        </div>
    );
};
const UI_LoginModal = function(props) {
    const { isLogin } = props;
    const [submitType, setSubmitType] = useState('login');
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        confirmPwd: '',
    });
    const submitForm = () => {
        switch(submitType) {
        case 'login':
            if (submitValidate(loginForm, 'login')) {
                login(loginForm);
            }
            break;
        case 'register':
            if (submitValidate(registerForm, 'register')) {
                register(registerForm);
            }
            break;
        }
    };

    if (isLogin) {
        return null;
    }

    return (
        <div
            id="loginModal"
            className="common-modal modal fade"
            tabIndex="-1"
            role="dialog"
        >
            <div
                className="modal-dialog"
                role="document"
            >
                <div className="modal-content">
                    <Header/>
                    <Body
                        setSubmitType={ setSubmitType }
                        loginForm={ loginForm }
                        setLoginForm={ setLoginForm }
                        registerForm={ registerForm }
                        setRegisterForm={ setRegisterForm }
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
let LoginModal;

Footer.propTypes = {
    submitForm: PropTypes.func.isRequired,
};
Body.propTypes = {
    setSubmitType: PropTypes.func.isRequired,
    loginForm: PropTypes.object,
    registerForm: PropTypes.object,
    setLoginForm: PropTypes.func.isRequired,
    setRegisterForm: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
};
Footer.propTypes = {
    submitType: PropTypes.string,
    loginForm: PropTypes.object,
    registerForm: PropTypes.object,
};
UI_LoginModal.propTypes = {
    isLogin: PropTypes.bool,
};

LoginModal = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_LoginModal);

export default LoginModal;