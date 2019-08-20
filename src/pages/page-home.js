import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
    Navbar,
    LoginModal
} from 'components';
import {
    stanLoading,
    initSeo
} from 'lib';

const UI_PageHome = function() {
    useEffect(() => {
        initSeo();
        stanLoading();

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);
    }, []);

    return (
        <div className="page-home">
            <Navbar/>
            <div className="page-section-body">
                <div className="main">
                    <h1 className="main-title">
                        MonkingStand
                    </h1>
                    <h3 className="sub-title">
                        thanks for visiting my blog,hope to code less,do more
                    </h3>
                    <h4 className="refer-info">
                        valar morghulis,valar dohaeris
                    </h4>
                    <div className="quick-link-container">
                        <div className="quick-link-content">
                            <a
                                rel="noopener noreferrer"
                                target="_blank"
                                href="https://github.com/MonkingStand"
                                className="quick-link"
                            >
                                <span className="link-img github-link"></span>
                                view on Github
                            </a>
                        </div>
                        <div className="quick-link-content">
                            <a href="/catalogue" className="quick-link">
                                <span className="link-img blog-link"></span>
                                view blog
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PageHome;

PageHome = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageHome);

export default PageHome;