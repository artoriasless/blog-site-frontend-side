import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'plugins/switch-button/index.js';

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
const LoginForm = function() {
    const resetPwdHandler = (evt) => { // eslint-disable-line

    };
    const formChangeHandler = (evt) => { // eslint-disable-line

    };
    const enterLoginHandler = (evt) => { // eslint-disable-line

    };

    return (
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
                    onChange={ event => formChangeHandler(event) }
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
                    onChange={ event => formChangeHandler(event) }
                    onKeyDown={ event => enterLoginHandler(event) }
                />
            </div>
        </form>
    );
};
const RegisterForm = function() {
    const formChangeHandler = (evt) => { // eslint-disable-line

    };
    const enterLoginHandler = (evt) => { // eslint-disable-line

    };

    return (
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
                    onChange={ event => formChangeHandler(event) }
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
                    onChange={ event => formChangeHandler(event) }
                />
            </div>
            <div className="form-group">
                <label htmlFor="register_passwordConfirm">
                    password
                </label>
                <input
                    id="register_passwordConfirm"
                    className="form-control"
                    type="password"
                    placeholder="confirm your password"
                    onChange={ event => formChangeHandler(event) }
                    onKeyDown={ event => enterLoginHandler(event) }
                />
            </div>
        </form>
    );
};
const Body = function(props) {
    const SwitchButton = function() {
        useEffect(() => {
            $('#switchBtn')
                .bootstrapToggle({
                    on: 'Login',
                    off: 'Register',
                    onstyle: 'default',
                    offstyle: 'default',
                })
                .change(function() {
                    var checked = $(this).prop('checked');
                    var tabLink = checked ? 'loginTabLink' : 'registerTabLink';

                    $(`#sign_in_up_tab #${tabLink}`).tab('show');
                });
        }, []);

        return (
            <div id="switch_In_Up_container">
                <input
                    id="switchBtn"
                    defaultChecked={ true }
                    type="checkbox"
                />
            </div>
        );
    };

    return (
        <div className="modal-body">
            <SwitchButton/>
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
                    <LoginForm
                        updateLoginForm={ props.updateLoginForm }
                        login={ props.login }
                        resetPwd={ props.resetPwd }
                        cache={ props.cache }
                    />
                </div>
                <div
                    id="content_register"
                    className="tab-pane fade"
                    role="tabpanel"
                >
                    <RegisterForm
                        updateRegisterForm={ props.updateRegisterForm }
                        register={ props.register }
                        cache={ props.cache }
                    />
                </div>
            </div>
        </div>
    );
};
const Footer = function() {
    const submitSignInUp = (evt) => { // eslint-disable-line

    };

    return (
        <div className="modal-footer">
            <a className="btn btn-primary submit-btn" onClick={ event => submitSignInUp(event) }>
                Submit
            </a>
        </div>
    );
};
const UI_LoginModal = function(props) {
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
                        updateRegisterForm={ props.updateRegisterForm }
                        updateLoginForm={ props.updateLoginForm }
                        login={ props.login }
                        register={ props.register }
                        resetPwd={ props.resetPwd }
                        cache={ props.cache }
                    />
                    <Footer
                        register={ props.register }
                        login={ props.login }
                        cache={ props.cache }
                    />
                </div>
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer;  //  eslint-disable-line
const mapDispatch2Props = (dispatch, props) => ({   //  eslint-disable-line
    updateRegisterForm: () => null,
    updateLoginForm: () => null,
    register: () => null,
    login: () => null,
    resetPwd: () => null,
});
let LoginModal;

Body.propTypes = {
    updateRegisterForm: PropTypes.func.isRequired,
    updateLoginForm: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired,
    cache: PropTypes.object,
};
UI_LoginModal.propTypes = {
    updateRegisterForm: PropTypes.func.isRequired,
    updateLoginForm: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    resetPwd: PropTypes.func.isRequired,
    cache: PropTypes.object,
};

LoginModal = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_LoginModal);

export default LoginModal;