import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    ajaxAction,
    stanAlert,
    getQueryParam,
    ModulePager,
} from 'lib';

const CatalogueItem = function(props) {
    const { data, userInfo } = props;
    const detailUrl = `/paper/${data.id}`;
    const catalogueItemTitle = data.title;
    const catalogueItemBrief = data.brief;
    const dateVal = data.gmtCreate.slice(0, 10);
    const tagVal = `${data.tag}${data.subtag ? `，${data.subtag}` : ''}`;

    return (
        <div className="catalogue-item">
            <a
                title={ catalogueItemTitle }
                href={ detailUrl }
                className="catalogue-item-title"
            >
                { catalogueItemTitle }
            </a>
            <div className="catalogue-item-subtitle">
                <div className="subtitle-tags pull-right">
                    <i className="fa fa-tags"></i>
                    &nbsp;
                    <span className="tags-val">
                        { tagVal }
                    </span>
                </div>
                <div className="subtitle-date pull-right">
                    <i className="fa fa-calendar"></i>
                    &nbsp;
                    <span className="date-val">
                        { dateVal }
                    </span>
                </div>
            </div>
            <p className="catalogue-item-brief">
                { catalogueItemBrief }
            </p>
            {
                !userInfo.isOwner ? null : (
                    <a className="edit-paper-link" href={ `/admin/edit-paper/${data.id}` }>
                        <i className="fa fa-edit"></i>
                    </a>
                )
            }
        </div>
    );
};
const CatalogueList = function(props) {
    const { catalogue, userInfo } = props;
    const catalogueList = catalogue.rows || [];

    if (catalogueList.length === 0) {
        return (
            <div className="no-item-tips">
                catalogue list is empty
                <br/>
                please check the url is right
            </div>
        );
    } else {
        return (
            <div className="catalogue-list">
                {
                    catalogueList.map(item => {
                        const key = `catalogueItem_${item.id}`;

                        return (
                            <CatalogueItem
                                data={ item }
                                userInfo={ userInfo }
                                key={ key }
                            />
                        );
                    })
                }
            </div>
        );
    }
};
const CataloguePager = function(props) {
    const { catalogue, pageJump } = props;
    const pageCount = Math.ceil(catalogue.count / 10);

    if (pageCount > 1) {
        return (
            <div className="catalogue-pager">
                <hr/>
                <ModulePager jumpHandler={ pageData => pageJump(pageData) } data={ catalogue }/>
            </div>
        );
    }

    return null;
};
const UI_Catalogue = function(props) {
    const [catalogue, setCatalogue] = useState({
        current: 1,
        dataCount: 0,
        rows: []
    });
    const {
        userInfo,
        filterType,
        filterParam,
    } = props;
    const getCatalogue = jsonData => {
        const successFunc = function(result) {
            if (result.success) {
                setCatalogue(result.data);
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

        ajaxAction('catalogue.page', jsonData, successFunc, failFunc);
    };
    const pageJump = pageData => {
        getCatalogue({
            page: pageData.page,
            filterType,
            filterParam,
        });
    };

    useEffect(() => {
        const { filterType, filterParam } = props;
        const page = (paramPage => {
            let _page = Number(paramPage);

            if (isNaN(_page) || _page < 1) {
                _page = 1;
            }

            return _page;
        })(getQueryParam('page'));

        getCatalogue({
            page,
            filterType,
            filterParam,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterType, filterParam]);

    return (
        <div id="catalogue" className="catalogue-container col-xs-12 col-md-8 col-lg-9">
            <div className="catalogue-content">
                <div className="catalogue-title">
                    Catalogue
                </div>
                <hr/>
                <CatalogueList catalogue={ catalogue } userInfo={ userInfo }/>
                <CataloguePager
                    filterType={ filterType }
                    filterParam={ filterParam }
                    catalogue={ catalogue }
                    pageJump={ pageJump }
                />
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer;  //  eslint-disable-line
const mapDispatch2Props = () => ({});
let Catalogue;

CatalogueItem.propTypes = {
    data: PropTypes.object,
    userInfo: PropTypes.object,
};
CataloguePager.propTypes = {
    catalogue: PropTypes.object,
    pageJump: PropTypes.func,
};
UI_Catalogue.propTypes = {
    userInfo: PropTypes.object,
    filterType: PropTypes.string,
    filterParam: PropTypes.string,
};

Catalogue = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_Catalogue);

export default Catalogue;