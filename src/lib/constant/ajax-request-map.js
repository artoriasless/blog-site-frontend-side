const GET = 'GET';
const POST = 'POST';
const ajaxRequestMap = {
    util: {
        uploadFile: {
            url: '/util/upload-file', type: POST
        }
    },
    message: {
        page: {
            url: '/api/message/page', type: GET
        }
    },
    user: {
        default: {
            url: '/api/user/default', type: GET
        },
        login: {
            url: '/api/user/login', type: POST
        },
        logout: {
            url: '/api/user/logout', type: POST
        },
        register: {
            url: '/api/user/register', type: POST
        },
        updateInfo: {
            url: '/api/user/update-info', type: POST
        },
        updatePwd: {
            url: '/api/user/update-pwd', type: POST
        },
    }
};

export default ajaxRequestMap;