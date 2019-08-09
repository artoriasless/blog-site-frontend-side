import React from 'react';
import { connect } from 'react-redux';

const UI_PaperEdit = function() {
    return (
        <></>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({});
let PaperEdit;

PaperEdit = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_PaperEdit);

export default PaperEdit;