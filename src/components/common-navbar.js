import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from 'actions';
import config from 'config';

const NavbarLeft = function() {
    return (
        <div className="navbar-left logo-container">
            <a href="/" className="logo"></a>
        </div>
    );
};
const NavbarRight = function(props) {
    const {
        userInfo,
        timestamp,
        logout
    } = props;
    const userName = userInfo.userName;
    const avatarLink = `${config.ossPublic.user}/${userInfo.uuid}.jpg?${timestamp}`;
    const userNameClass = !userInfo.isEnabled ? 'user-name inactivated' : 'user-name';
    const $userAvatar = useRef(null);
    const showLoginModal = () => {
        $('.navbar-collapse').collapse('hide');
        $('#loginModal').modal();
        document.querySelector('#registerForm').reset();
        document.querySelector('#loginForm').reset();
    };
    const errHandler = (evt) => { // eslint-disable-line
        const defaultAvatarLink = `${config.ossPublic.user}/default.jpg`;

        $userAvatar.current.setAttribute('src', defaultAvatarLink);
    };

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
                        userInfo.isOwner && userInfo.uuid ? (
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
                        ) : null
                    }
                    <li className="nav-item">
                        <a className="nav-link" href="/catalogue">
                            Catalogue
                        </a>
                    </li>
                    <li className="nav-item">
                        {
                            userInfo.id && userInfo.email && userInfo.password ? (
                                <a className="nav-link user-center-link" href={ `/user/${userInfo.uuid}` }>
                                    <img
                                        className="user-avatar"
                                        src={ avatarLink }
                                        onError={ event => errHandler(event) }
                                        ref={ $userAvatar }
                                    />
                                    <span className={ userNameClass }>{ userName }</span>
                                </a>
                            ) : (
                                <a
                                    className="nav-link login-link"
                                    href="javascript:;"
                                    onClick = { () => showLoginModal() }
                                >
                                    Guest,please login...
                                </a>
                            )
                        }
                    </li>
                    {
                        userInfo.id && userInfo.email && userInfo.password ? (
                            <li className="nav-item">
                                <a
                                    className="nav-link logout-link"
                                    href="javascript:;"
                                    onClick = { () => logout() }
                                >
                                    Logout
                                </a>
                            </li>
                        ) : null
                    }
                </ul>
            </div>
        </nav>
    );
};
const UI_Navbar = function(props) {
    const {
        userInfo,
        timestamp,
        logout,
    } = props;

    return (
        <div className="page-section-header">
            <div className="page-section-header-container">
                <NavbarLeft/>
                <NavbarRight
                    userInfo={ userInfo }
                    logout={ logout }
                    timestamp={ timestamp }
                />
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({
    logout,
});
let Navbar;

NavbarRight.propTypes = {
    userInfo: PropTypes.object,
    logout: PropTypes.func.isRequired,
    timestamp: PropTypes.number,
};
UI_Navbar.propTypes = {
    timestamp: PropTypes.number,
    userInfo: PropTypes.object,
    logout: PropTypes.func.isRequired
};

Navbar = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_Navbar);

export default Navbar;
