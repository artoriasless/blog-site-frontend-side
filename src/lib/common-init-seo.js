const updateMeta = (key, val) => {
    $(key).attr('content', val);

    return null;
};
const initSeo = (data, opts = {}) => {
    const route = window.location.pathname;
    const defaultOpts = {
        title: 'Stan\'s enhanced blog site',
        keywords: 'blog,koa2,react@functional_component,redux,mysql',
        description: 'enhanced blog site belongs to Stan using koa2/react/redux/mysql',
        follow: true,
        index: true,
    };

    opts = Object.assign({}, defaultOpts, opts);

    const {
        follow,
        index,
    } = opts;
    const robots = `${follow ? '' : 'no'}follow,${index ? '' : 'no'}index`;
    let {
        title,
        keywords,
        description,
    } = opts;

    if (/^\/catalogue$/.test(route)) {
        title = `catalogue list without filter in page ${data.page}`;
        keywords = `catalogue_list,no_filter,page${data.page}`;
        description = (rows => {
            const tagList = [];
            const subtagList = [];
            const uniqueMap = {};

            rows.forEach(row => {
                if (row.tag && !uniqueMap[row.tag]) {
                    uniqueMap[row.tag] = true;
                    tagList.push(row.tag);
                }
                if (row.subtag && !uniqueMap[row.subtag]) {
                    uniqueMap[row.subtag] = true;
                    subtagList.push(row.subtag);
                }
            });

            return `${tagList.join('，')}${subtagList.length ? ('，' + subtagList.join('，')) : ''}`;
        })(data.catalogue.rows);
    } else if (/^\/catalogue\/(tag|timeline)\//.test(route)) {
        title = `catalogue list with filter param [${data.filterParam}] under [${data.filterType}] in page ${data.page}`;
        keywords = `catalogue_list,under_${data.filterType},filter_by_${data.filterParam},page${data.page}`;
        description = (rows => {
            const tagList = [];
            const subtagList = [];
            const uniqueMap = {};

            rows.forEach(row => {
                if (row.tag && !uniqueMap[row.tag]) {
                    uniqueMap[row.tag] = true;
                    tagList.push(row.tag);
                }
                if (row.subtag && !uniqueMap[row.subtag]) {
                    uniqueMap[row.subtag] = true;
                    subtagList.push(row.subtag);
                }
            });

            return `${tagList.join('，')}${subtagList.length ? ('，' + subtagList.join('，')) : ''}`;
        })(data.catalogue.rows);
    } else if (/^\/paper\/\d+/.test(route)) {
        title = data.title;
        keywords = `${data.tag}，${data.subtag}`;
        description = `${data.brief.slice(0, 250)}${data.brief.length > 250 ? '......' : ''}`;
    }

    $('title').html(title);
    updateMeta('[property="og:title"]', title);
    updateMeta('[name=keywords]', keywords);
    updateMeta('[property="og:keywords"]', keywords);
    updateMeta('[name=description]', description);
    updateMeta('[property="og:description"]', description);
    updateMeta('[name=robots]', robots);
};

export default initSeo;