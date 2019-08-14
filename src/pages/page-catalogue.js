import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    Navbar,
    LoginModal,
    PaperFilter,
    Catalogue
} from 'components';
import { stanLoading } from 'lib';

const UI_PageCatalogue = function(props) {
    const { params } = props;
    const filterReg = /^((t|T)(i|I)(m|M)(e|E)(l|L)(i|I)(n|N)(e|E)|(t|T)(a|A)(g|G))$/g;
    const filterParam = params.filterParam || '';
    let filterType = params.filterType;

    filterType = filterReg.test(filterType) ? filterType.toLowerCase() : 'all';

    useEffect(() => {
        stanLoading();

        window.onresize = () => {
            const currentViewWidth = document.body.offsetWidth;

            if (currentViewWidth >= 767) {
                $('.filter-container').css('display', 'block');
            } else {
                $('.page-section-body').removeClass('filter-expand');
                $('.filter-container').css('display', 'none');
            }
        };

        setTimeout(() => {
            stanLoading('hide');
            $('#root').removeClass('hidden').addClass('fade-in-animate');
        }, 500);
    }, []);

    return (
        <div className="page-catalogue">
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
const mapDispatch2Props = () => ({});
let PageCatalogue;

UI_PageCatalogue.propTypes = {
    params: PropTypes.object.isRequired,
};

PageCatalogue = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PageCatalogue);

export default PageCatalogue;