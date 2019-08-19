const stanConfirm = (options = {}) => {
    /**
     *  通用的 alert 方法，警告内容支持 html 格式标签
     *  @param {object} [options] 相关参数、设定
     *      {string}  [title]     （必选）指定 confirm 内容的大标题
     *      {string}  [content]   （必选）指定 confirm 内容的正文
     *      {string}  [textAlign] （可选）指定 confirm 中主体内容的文案对齐方式，默认 left ，可传入值为 left/center/right
     *      {string}  [btnAlign]  （可选）指定 confirm 中操作按钮的对齐方式，默认 right ，可传入值为 left/center/right
     *      {object}  [confirm]   （可选）指定点击 confirm 后的回调方法
     *      {object}  [cancel]    （可选）指定点击 cancel 后的回调方法
     */
    const alignMap = {
        'left': 'left',
        'center': 'center',
        'right': 'right',
    };
    const confirmTitle = options.title || '';
    const confirmContent = options.content || '';
    const textAlign = options.textAlign ? (alignMap[options.textAlign] || 'left') : 'left';
    const btnAlign = options.btnAlign ? (alignMap[options.btnAlign] || 'right') : 'right';
    const modalId = `confirmModal_${Date.parse(new Date())}`;
    const $confirmDom = $('' +
        `<div id="${modalId}" class="confirm-modal common-modal modal fade" tabIndex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title confirm-title">
                            ${confirmTitle}
                        </h5>
                        <a class="btn close" data-dismiss="modal" aria-label="Close">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div class="modal-body confirm-content text-${textAlign}">
                        ${confirmContent}
                    </div>
                    <div class="modal-footer ${btnAlign}">
                        <a class="btn btn-default cancel-btn">
                            Cancel
                        </a>
                        <a class="btn btn-primary confirm-btn">
                            Confirm
                        </a>
                    </div>
                </div>
            </div>
        </div>`);

    $('body').append($confirmDom);
    $confirmDom.find('.modal-footer .confirm-btn').on('click', () => {
        $confirmDom.modal('hide');
        options.confirm && options.confirm();
    });
    $confirmDom.find('.modal-footer .cancel-btn').on('click', () => {
        $confirmDom.modal('hide');
        options.cancel && options.cancel();
    });
    $confirmDom.modal().on('hidden.bs.modal', () => {
        $confirmDom.remove();
    });
};

export default stanConfirm;