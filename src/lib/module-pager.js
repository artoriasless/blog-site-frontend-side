import React from 'react';
import PropTypes from 'prop-types';

const PagerFoot = function(props) {
    const { current, pageCount, jumpHandler } = props.config;
    const pageLinkClass = (current === pageCount) ? 'page-link disable' : 'page-link';
    const pageJump = (evt, target) => { //  eslint-disable-line
        jumpHandler({
            page: target,
        });
    };

    return (
        <li className="page-item">
            <a
                className={ pageLinkClass }
                href="javascript:;"
                onClick={ event => pageJump(event, pageCount) }
            >
                <i className="fa fa-step-forward"></i>
            </a>
        </li>
    );
};
const PagerNext = function(props) {
    const { current, pageCount, jumpHandler } = props.config;
    const pageLinkClass = (current === pageCount) ? 'page-link disable' : 'page-link';
    const pageJump = (evt, target) => { //  eslint-disable-line
        jumpHandler({
            page: target,
        });
    };

    return (
        <li className="page-item">
            <a
                className={ pageLinkClass }
                href="javascript:;"
                onClick={ event => pageJump(event, current + 1) }
            >
                <i className="fa fa-angle-right"></i>
            </a>
        </li>
    );
};
const PagerNextEllipsis = function(props) {
    const { current, pageCount, jumpHandler } = props.config;
    const pageArr = [];
    const pageJump = (evt, target) => { //  eslint-disable-line
        jumpHandler({
            page: target,
        });
    };

    for (let i = 0; i < 3; i++) {
        pageArr.push(
            <li key={ `page_link_${current + i + 1}` } className="page-item">
                <a
                    className="page-link"
                    href="javascript:;"
                    onClick={ event => this.clickHandler(event, (current + i + 1)) }
                >
                    { current + i + 1 }
                </a>
            </li>
        );
    }

    switch(current) {
    case pageCount:
        return null;
    case (pageCount - 1):
        pageArr.pop();
        pageArr.pop();
        break;
    case (pageCount - 2):
        pageArr.pop();

        if (pageCount > 3) {
            pageArr.pop();
            pageArr.push(
                <li className="page-item" key="page_link_ellipsis_next">
                    <a className="page-link ellipsis" href="javascript:;">
                        <i className="fa fa-ellipsis-h"></i>
                    </a>
                </li>
            );
        }

        break;
    default:
        pageArr.pop();
        pageArr.push(
            <li className="page-item" key="page_link_ellipsis_next">
                <a className="page-link ellipsis" href="javascript:;">
                    <i className="fa fa-ellipsis-h"></i>
                </a>
            </li>
        );
    }

    return pageArr;
};
const PagerCurrent = function(props) {
    return (
        <li className="page-item">
            <a
                className="page-link active"
                href="javascript:;"
            >
                { props.config.current }
            </a>
        </li>
    );
};
const PagerPrevEllipsis = function(props) {
    const { current, pageCount, jumpHandler } = props.config;
    const pageArr = [];
    const pageJump = (evt, target) => { //  eslint-disable-line
        jumpHandler({
            page: target,
        });
    };

    for (let i = 0; i < 3; i++) {
        pageArr.unshift(
            <li key={ `page_link_${current - i - 1}` }className="page-item">
                <a
                    className="page-link"
                    href="javascript:;"
                    onClick={ event => this.clickHandler(event, (current - i - 1)) }
                >
                    { current - i - 1 }
                </a>
            </li>
        );
    }

    switch(current) {
    case 1:
        return null;
    case 2:
        pageArr.shift();
        pageArr.shift();
        break;
    case 3:
        pageArr.shift();

        if (pageCount > 3) {
            pageArr.shift();
            pageArr.unshift(
                <li className="page-item" key="page_link_ellipsis_prev">
                    <a className="page-link ellipsis" href="javascript:;">
                        <i className="fa fa-ellipsis-h"></i>
                    </a>
                </li>
            );
        }

        break;
    default:
        pageArr.shift();
        pageArr.unshift(
            <li className="page-item" key="page_link_ellipsis_prev">
                <a className="page-link ellipsis" href="javascript:;">
                    <i className="fa fa-ellipsis-h"></i>
                </a>
            </li>
        );
    }

    return pageArr;
};
const PagerPrev = function(props) {
    const { current, jumpHandler } = props.config;
    const pageLinkClass = (current === 1) ? 'page-link disable' : 'page-link';
    const pageJump = (evt, target) => { //  eslint-disable-line
        jumpHandler({
            page: target,
        });
    };

    return (
        <li className="page-item">
            <a
                className={ pageLinkClass }
                href="javascript:;"
                onClick={ event => pageJump(event, current - 1) }
            >
                <i className="fa fa-angle-left"></i>
            </a>
        </li>
    );
};
const PagerHead = function(props) {
    const { current, jumpHandler } = props.config;
    const pageLinkClass = (current === 1) ? 'page-link disable' : 'page-link';
    const pageJump = (evt, target) => { //  eslint-disable-line
        jumpHandler({
            page: target,
        });
    };

    return (
        <li className="page-item">
            <a
                className={ pageLinkClass }
                href="javascript:;"
                onClick={ event => pageJump(event, 1) }
            >
                <i className="fa fa-step-backward"></i>
            </a>
        </li>
    );
};
let Pager;

PagerFoot.propTypes = {
    config: PropTypes.object,
};
PagerNext.propTypes = {
    config: PropTypes.object,
};
PagerNextEllipsis.propTypes = {
    config: PropTypes.object,
};
PagerCurrent.propTypes = {
    config: PropTypes.object,
};
PagerPrevEllipsis.propTypes = {
    config: PropTypes.object,
};
PagerPrev.propTypes = {
    config: PropTypes.object,
};
PagerHead.propTypes = {
    config: PropTypes.object,
};

Pager = function(props) {
    const { data, jumpHandler } = props;
    const { current, dataCount } = data;
    const pageCount = Math.ceil(dataCount / 10);
    const config = {
        current,
        dataCount,
        pageCount,
        jumpHandler,
    };

    if (pageCount === 1) {
        return null;
    } else {
        return (
            <div className="pager-container">
                <div className="pager-tips">
                    { current }/{ pageCount }
                </div>
                <nav className="pager-content" aria-label="Page navigation example">
                    <ul className="pagination">
                        <PagerHead config={ config }/>
                        <PagerPrev config={ config }/>
                        <PagerPrevEllipsis config={ config }/>
                        <PagerCurrent config={ config }/>
                        <PagerNextEllipsis config={ config }/>
                        <PagerNext config={ config }/>
                        <PagerFoot config={ config }/>
                    </ul>
                </nav>
            </div>
        );
    }
};

export default Pager;