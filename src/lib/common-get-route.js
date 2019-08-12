const getRoute = () => document.URL.replace(/^[^/]+\/\/[^/]+/, '');

export default getRoute;