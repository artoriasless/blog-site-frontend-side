const GET = 'GET';
const POST = 'POST';
const ajaxOptsMap = {
};
const getAjaxOpts = (ajaxName, ajaxData) => {
    const paramReg = /\/(:([^/]+))(\/|$)/;
    const keyArr = ajaxName.split('.');
    let opts = Object.assign({}, ajaxOptsMap);

    keyArr.forEach(key => {
        opts = opts[key];
    });
    opts.data = ajaxData;

    // 检查请求地址中是否有 param 参数需要替换
    const paramRegResult = opts.url.match(paramReg);

    if (paramRegResult) {
        const paramVariable = paramRegResult[1];
        const paramStr = paramRegResult[2];
        const paramKeyArr = paramStr.split('.');
        let paramValue = Object.assign({}, ajaxData);

        paramKeyArr.forEach(key => {
            paramValue = paramValue[key];
        });

        opts.url = opts.url.replace(paramVariable, paramValue);
    }

    return opts;
};
const ajaxAction = (ajaxName, ajaxData, successFunc, failFunc) => {
    /**
     * 将 ajax 请求封装了一下，便于调用，减少重复的代码
     *
     * @param {string} ajaxName 对应 ajax 请求的方法别名，例如 util.contries
     * @param {object} ajaxData 对应请求传给后端的数据
     * @param {function} successFunc 对应 ajax 请求结束后的回调方法
     * @param {function} failFunc 对应 ajax 请求失败后的回调方法
     */
    const ajaxOpts = getAjaxOpts(ajaxName, ajaxData);
};

export default ajaxAction;