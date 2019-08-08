const getQueryParam = parameterName => {
    const reg = new RegExp('(^|&)'+ parameterName + '=([^&]*)(&|$)');
    const url = window.location.search.substr(1).match(reg);

    if (url != null) {
        return decodeURI(url[2]);
    }

    return null;
};

export default getQueryParam;