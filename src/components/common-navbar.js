import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import config from 'config';

const NavbarLeft = function() {
    return (
        <div className="navbar-left logo-container">
            <a href="/" className="logo"></a>
        </div>
    );
};
const NavbarRightAdmin = function() {
    return (
        <li className="nav-item dropdown">
            <a
                id="navbarAdminDropdown"
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Admin
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarAdminDropdown">
                <a className="dropdown-item" href="/admin/add-paper">
                    Add Paper
                </a>
            </div>
        </li>
    );
};
const NavbarRightCatalogue = function() {
    return (
        <li className="nav-item">
            <a className="nav-link" href="/catalogue">
                Catalogue
            </a>
        </li>
    );
};
const NavbarRightUser = function(props) {
    const userInfo = props.userInfo;
    const UserLink = function(props) {
        const $userAvatar = useRef(null);
        const userInfo = props.userInfo;
        const userName = userInfo.userName;
        const avatarLink = `${config.ossPublic.user}/${userInfo.uuid}.jpg?${Date.parse(new Date())}`; //  eslint-disable-line
        const userNameClass = !userInfo.isEnabled ? 'user-name inactivated' : 'user-name';
        const errHandler = (evt) => { // eslint-disable-line
            const defaultAvatarLink = `${config.ossPublic.user}/default.jpg?${Date.parse(new Date())}`;

            $userAvatar.setAttribute('src', defaultAvatarLink);
        };

        return (
            <a
                className="nav-link user-center-link"
                href={ `/user/${userInfo.uuid}` }
            >
                <img
                    className="user-avatar"
                    src={ avatarLink }
                    onError={ event => errHandler(event) }
                    ref={ $userAvatar }
                />
                <span className={ userNameClass }>{ userName }</span>
            </a>
        );
    };
    const LoginLink = function() {
        const showLoginModal = () => {
            $('.navbar-collapse').collapse('hide');
            $('#loginModal').modal();
            document.querySelector('#registerForm').reset();
            document.querySelector('#loginForm').reset();
        };

        return (
            <a
                className="nav-link login-link"
                href="javascript:;"
                onClick = { () => showLoginModal() }
            >Guest,please login...</a>
        );
    };

    return (
        <li className="nav-item">
            {
                userInfo.id && userInfo.email && userInfo.password ?
                    <UserLink userInfo={ userInfo }/> :
                    <LoginLink/>
            }
        </li>
    );
};
const NavbarRightLogout = function(props) {
    return (
        <li className="nav-item">
            <a
                className="nav-link logout-link"
                href="javascript:;"
                onClick = { () => props.logout() }
            >
                Logout
            </a>
        </li>
    );
};
const NavbarRight = function(props) {
    const userInfo = props.userInfo;

    useEffect(() => {
        $(document).on('click', '*', function() {
            if ($(this).closest('.navbar-collapse').length === 0) {
                $('.navbar-collapse').collapse('hide');
            }
        });
    }, []);

    return (
        <nav className="navbar-right navbar navbar-expand-sm">
            <a
                className="navbar-toggler btn"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <i className="fa fa-bars"></i>
            </a>
            <div
                id="navbarNavDropdown"
                className="collapse navbar-collapse"
            >
                <ul className="navbar-nav">
                    {
                        userInfo.isOwner && userInfo.uuid ?
                            <NavbarRightAdmin/> :
                            null
                    }
                    <NavbarRightCatalogue/>
                    <NavbarRightUser userInfo={ userInfo }/>
                    {
                        userInfo.id && userInfo.email && userInfo.password ?
                            <NavbarRightLogout userInfo={ userInfo } logout={ props.logout }/> :
                            null
                    }
                </ul>
            </div>
        </nav>
    );
};
const UI_Navbar = function(props) {
    const userInfo = props.userInfo;

    useEffect(() => {
        const initUserInfo = props.initUserInfo;

        initUserInfo();
    });

    return (
        <div className="page-section-header">
            <div className="page-section-header-container">
                <NavbarLeft/>
                <NavbarRight userInfo={ userInfo } logout={ props.logout }/>
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer;  //  eslint-disable-line
const mapDispatch2Props = (dispatch, props) => ({   //  eslint-disable-line
    initUserInfo: () => null,
    logout: () => null,
});
let Navbar;

NavbarRightUser.propTypes = {
    userInfo: PropTypes.object,
};
NavbarRightLogout.propTypes = {
    logout: PropTypes.func.isRequired,
};
NavbarRight.propTypes = {
    userInfo: PropTypes.object,
    logout: PropTypes.func.isRequired
};
UI_Navbar.propTypes = {
    userInfo: PropTypes.object,
    initUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
};

Navbar = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_Navbar);

export default Navbar;
