import store from 'reducers';

import { getRoute } from 'lib';

const UPDATE_TIMESTAMP = () => {
    const current = getRoute();

    return ({
        type: 'UPDATE_TIMESTAMP',
        payload: {
            current,
            timestamp: Date.parse(new Date()),
        },
    });
};
const updateTimestamp = () => store.dispatch(UPDATE_TIMESTAMP());

export default updateTimestamp;