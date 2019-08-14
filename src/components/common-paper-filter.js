import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    stanAlert,
    ajaxAction
} from 'lib';

const FilterContentLatest = function(props) {
    const { filter } = props;
    const filterRows = filter.rows;

    return (
        <div className="filter-content">
            <dl className="filter-list latest">
                <dt className="filter-list-title">
                    Latest
                </dt>
                {
                    filterRows.map((filterItem, index) => {
                        const key = `latestFilterItem_${index}`;
                        const no = `${index + 1}.`;
                        const detailUrl = `/paper/${filterItem.id}`;
                        const filterItemVal = filterItem.title;

                        return (
                            <dd className="filter-list-item" key={ key }>
                                <a
                                    title={filterItemVal}
                                    className="item-link"
                                    href={ detailUrl }
                                >
                                    { no }{ filterItemVal }
                                </a>
                            </dd>
                        );
                    })
                }
            </dl>
        </div>
    );
};
const FilterContentTag = function(props) {
    const { filter } = props;
    const filterCount = filter.count;
    const filterRows = filter.rows;

    return (
        <div className="filter-content">
            <dl className="filter-list tag">
                <dt className="filter-list-title">
                    Tags
                </dt>
                {
                    filterRows.map((filterItem, index) => {
                        const key = `tagsFilterItem_${index}`;
                        const detailUrl = `/catalogue/tag/${filterItem.tag}`;
                        const filterItemVal = filterItem.tag;
                        const filterItemCount = `(${filterCount[index].count})`;

                        return (
                            <dd className="filter-list-item" key={ key }>
                                <a className="item-link" href={ detailUrl }>
                                    <span className="tag-val">
                                        { filterItemVal }
                                    </span>
                                    <span className="tag-count">
                                        { filterItemCount }
                                    </span>
                                </a>
                            </dd>
                        );
                    })
                }
            </dl>
        </div>
    );
};
const FilterContentTimeline = function(props) {
    const { filter } = props;
    const filterCount = filter.count;
    const filterRows = filter.rows;

    return (
        <div className="filter-content">
            <dl className="filter-list timeline">
                <dt className="filter-list-title">
                    Timeline
                </dt>
                {
                    filterRows.map((filterItem, index) => {
                        const key = `timelineFilterItem_${index}`;
                        const detailUrl = `/catalogue/timeline/${filterItem.yearTag}`;
                        const filterItemVal = filterItem.yearTag;
                        const filterItemCount = `(${filterCount[index].count})`;

                        return (
                            <dd className="filter-list-item" key={ key }>
                                <a className="item-link" href={ detailUrl }>
                                    <span className="timeline-val">
                                        { filterItemVal }
                                    </span>
                                    <span className="timeline-count">
                                        { filterItemCount }
                                    </span>
                                </a>
                            </dd>
                        );
                    })
                }
            </dl>
        </div>
    );
};
const UI_PaperFilter = function() {
    const [filter, setFilter] = useState({
        latest: { count: 0, rows: [], },
        tag: { count: 0, rows: [], },
        timeline: { count: 0, rows: [], },
    });
    const togglePaperFilter = (evt) => {
        const $container = $(evt.target).closest('.page-section-body');
        const $filterContainer = $container.find('.filter-container');

        if ($container.hasClass('filter-expand')) {
            $container.removeClass('filter-expand');
            $filterContainer.fadeOut();
        } else {
            $container.addClass('filter-expand');
            $filterContainer.fadeIn();
        }
    };
    const getFilterCount = () => {
        const jsonData = {
            filterType: 'all'
        };
        const successFunc = function(result) {
            if (result.success) {
                setFilter(result.data);
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

        ajaxAction('paper.filterCount', jsonData, successFunc, failFunc);
    };

    useEffect(() => {
        getFilterCount();
    }, []);

    return (
        <>
            <a className="paper-filter-toggler" href="javascript:;">
                <i onClick={ event => togglePaperFilter(event) } className="fa fa-expand show-icon pull-left"></i>
                <i onClick={ event => togglePaperFilter(event) } className="fa fa-compress hide-icon pull-right"></i>
            </a>
            <div className="filter-container col-xs-12 col-md-4 col-lg-3">
                <FilterContentLatest filter={ filter.latest }/>
                <FilterContentTag filter={ filter.tag }/>
                <FilterContentTimeline filter={ filter.timeline }/>
            </div>
        </>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PaperFilter;

FilterContentLatest.propTypes = {
    filter: PropTypes.object
};
FilterContentTag.propTypes = {
    filter: PropTypes.object
};
FilterContentTimeline.propTypes = {
    filter: PropTypes.object
};

PaperFilter = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PaperFilter);

export default PaperFilter;
