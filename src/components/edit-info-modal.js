import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { stanAlert } from 'lib';

const Header = function() {
    return (
        <div className="modal-header">
            <h5 className="modal-title">
                Edit User Info
            </h5>
            <a
                className="btn close"
                data-dismiss="modal"
                aria-label="Close"
            >
                <i className="fa fa-times" aria-hidden="true"></i>
            </a>
        </div>
    );
};
const Body = function(props) {
    const { updateUserInfoForm } = props;
    const formChangeHandler = (evt) => { // eslint-disable-line
        const userName = '';
        const gender = Number($('#editInfoForm').find('[name=gender]:checked').val());

        updateUserInfoForm({
            userName,
            gender,
        });
    };

    return (
        <form id="editInfoForm">
            <div className="form-group">
                <label htmlFor="editInfo_userName">
                    user name
                </label>
                <input
                    id="editInfo_userName"
                    className="form-control"
                    type="text"
                    placeholder="type your user name"
                    name="userName"
                    onChange={ event => formChangeHandler(event) }
                />
            </div>
            <div className="form-group">
                <label>
                    gender
                </label>
                <div className="gender-radio-contaienr">
                    <div className="stan-radio-container">
                        <label className="stan-radio">
                            <i className="fa fa-mars"></i>
                            Male
                            <input
                                className="stan-radio-input"
                                type="radio"
                                name="gender"
                                value="0"
                                defaultChecked="true"
                                onChange={ event => formChangeHandler(event) }
                            />
                            <div className="stan-radio-indicator"></div>
                        </label>
                    </div>
                    <div className="stan-radio-container">
                        <label className="stan-radio">
                            <i className="fa fa-venus"></i>
                            Female
                            <input
                                className="stan-radio-input"
                                type="radio"
                                name="gender"
                                value="1"
                                onChange={ event => formChangeHandler(event) }
                            />
                            <div className="stan-radio-indicator"></div>
                        </label>
                    </div>
                    <div className="stan-radio-container">
                        <label className="stan-radio">
                            <i className="fa fa-transgender"></i>
                            Transgender
                            <input
                                className="stan-radio-input"
                                type="radio"
                                name="gender"
                                value="2"
                                onChange={ event => formChangeHandler(event) }
                            />
                            <div className="stan-radio-indicator"></div>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
};
const Footer = function(props) {
    const { cache, updateUserInfo } = props;
    const submitValidate = formData => {
        const alertInfo = {
            title: 'Warning!',
            userName: {
                null: 'please type your user name!',
                illegal: 'the user name can\'t exceed 15 characters in length!',
            },
        };

        if (!formData.userName) {
            stanAlert({
                title: alertInfo.title,
                content: alertInfo.userName.null,
            });

            return false;
        } else if (formData.userName.length > 15) {
            stanAlert({
                title: alertInfo.title,
                content: alertInfo.userName.illegal,
            });

            return false;
        }

        return true;
    };
    const submitForm = (evt) => { // eslint-disable-line
        const jsonData = cache.userInfo;

        if (submitValidate(jsonData)) {
            updateUserInfo(jsonData);
        }
    };

    return (
        <div className="modal-footer">
            <a className="btn btn-primary submit-btn" onClick={ event => submitForm(event) }>
                Submit
            </a>
        </div>
    );
};
const UI_EditInfoModal = function(props) {
    const {
        cache,
        userInfo,
        updateUserInfoForm,
        updateUserInfo,
    } = props;

    return (
        <div
            id="editInfoModal"
            className="common-modal modal fade"
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <Header/>
                    <Body userInfo={ userInfo } updateUserInfoForm={ updateUserInfoForm }/>
                    <Footer cache={ cache } updateUserInfo={ updateUserInfo }/>
                </div>
            </div>
        </div>
    );
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = (dispatch, props) => ({ // eslint-disable-line
    updateUserInfoForm: () => null,
    updateUserInfo: () => null,
});
let EditInfoModal;

Body.propTypes = {
    updateUserInfoForm: PropTypes.func.isRequired,
};
Footer.propTypes = {
    cache: PropTypes.object,
    updateUserInfo: PropTypes.func.isRequired,
};
UI_EditInfoModal.propTypes = {
    cache: PropTypes.object,
    userInfo: PropTypes.object,
    updateUserInfoForm: PropTypes.func.isRequired,
    updateUserInfo: PropTypes.func.isRequired,
};

EditInfoModal = connect(
    mapState2Props,
    mapDispatch2Props
)(UI_EditInfoModal);

export default EditInfoModal;