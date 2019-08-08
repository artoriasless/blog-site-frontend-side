const stanLoading = hide => {
    var loadingDom = '' +
        `<div class="stan-loading-container">
            <div class="stan-loading-content"></div>
        </div>`;

    if (hide) {
        $('.stan-loading-container').fadeOut('normal', function() {
            $(this).remove();
        });
    } else {
        if ($('.stan-loading-container').length === 0) {
            $('body').append(loadingDom);
        }
    }
};

export default stanLoading;