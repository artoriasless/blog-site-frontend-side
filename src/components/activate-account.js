import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UI_ActivateAccount = function(props) {
    const { uuid, activateAccount } = props.uuid;

    useEffect(() => {
        activateAccount({
            uuid,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};
const mapState2Props = (state, props) => state.appReducer; // eslint-disable-line
const mapDispatch2Props = () => ({
    activateAccount: () => null,
});
let ActivateAccount;

UI_ActivateAccount.propTypes = {
    uuid: PropTypes.string,
    activateAccount: PropTypes.func.isRequired,
};

ActivateAccount= connect(
    mapState2Props,
    mapDispatch2Props
)(UI_ActivateAccount);

export default ActivateAccount;