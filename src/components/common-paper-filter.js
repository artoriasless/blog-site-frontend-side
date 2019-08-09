import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const FilterContentLatest = function(props) {
    const filterRows = props.filter.rows;

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
    const filterCount = props.filter.count;
    const filterRows = props.filter.rows;

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
    const filterCount = props.filter.count;
    const filterRows = props.filter.rows;

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
const UI_PaperFilter = function(props) {
    const filter = props.filter;
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
const mapDispatch2Props = () => ({
    getTagFilter: () => null,
    getTimelineFilter: () => null,
    getLatestFilter: () => null,
});
let PaperFilter;

FilterContentTimeline.propTypes = {
    filter: PropTypes.object.isRequired,
};
FilterContentTag.propTypes = {
    filter: PropTypes.object.isRequired,
};
FilterContentLatest.propTypes = {
    filter: PropTypes.object.isRequired,
};
UI_PaperFilter.propTypes = {
    filter: PropTypes.object.isRequired,
};

PaperFilter = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PaperFilter);

export default PaperFilter;
