import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changeRoute } from 'actions';
import {
    Navbar,
    LoginModal,
    PaperFilter,
    Catalogue
} from 'components';
import {
    getRoute,
    stanLoading
} from 'lib';

const UI_PageCatalogue = function(props) {
    const filterReg = /^((t|T)(i|I)(m|M)(e|E)(l|L)(i|I)(n|N)(e|E)|(t|T)(a|A)(g|G))$/g;
    const filterParam = props.params.filterParam || '';
    let filterType = props.params.filterType;

    filterType = filterReg.test(filterType) ? filterType.toUpperCase() : 'ALL';

    useEffect(() => {
        stanLoading();

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);
    }, []);

    if (getRoute() !== props.current) {
        props.changeRoute();
    }

    return (
        <div className="page-catalogue" key={ props.current }>
            <Navbar/>
            <div className="page-section-body row">
                <PaperFilter/>
                <Catalogue filterType={ filterType } filterParam={ filterParam }/>
            </div>
            <LoginModal/>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer;  //  eslint-disable-line
const mapDispatch2Props = (dispatch, props) => ({ // eslint-disable-line
    changeRoute,
});
let PageCatalogue;

UI_PageCatalogue.propTypes = {
    params: PropTypes.object.isRequired,
    changeRoute: PropTypes.func.isRequired,
    current: PropTypes.string,
};

PageCatalogue = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageCatalogue);

export default PageCatalogue;