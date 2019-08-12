import store from 'reducers';

import { getRoute } from 'lib';

const CHANGE_ROUTE = () => {
    const current = getRoute();

    return ({
        type: 'CHANGE_ROUTE',
        payload: {
            current,
        },
    });
};
const changeRoute = () => store.dispatch(CHANGE_ROUTE());

export default changeRoute;