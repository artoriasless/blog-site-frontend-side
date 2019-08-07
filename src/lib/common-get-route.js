const getRoute = () => {
    const domain = window.location.host;
    const currentRoute = window.location.href.split(domain)[1];

    return currentRoute;
};

export default getRoute;