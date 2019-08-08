import store from 'reducers';

const CHANGE_ROUTE = () => {
    const url = document.URL;
    const reg = /^[^/]+\/\/[^/]+/;
    const current = url.replace(reg, '');

    return ({
        type: 'CHANGE_ROUTE',
        payload: {
            current,
        },
    });
};
const changeRoute = () => store.dispatch(CHANGE_ROUTE());

export default changeRoute;