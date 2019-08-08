const locationCompass = () => {
    const $root = $('#root');
    const $compassIcon = $('#compassIcon');
    const $app = $root.find('.app');
    const compassHeight = $compassIcon.height();
    const navbarHeight = $root.find('.page-section-header').height();
    const scrollTopVal = $app.scrollTop();
    const containerHeight = window.innerHeight;
    const contentHeight = $app.prop('scrollHeight') - document.body.scrollHeight;

    if (containerHeight !== contentHeight) {
        const topVal = containerHeight * (scrollTopVal / contentHeight) - navbarHeight - (compassHeight * 1.5);

        $compassIcon
            .css('top', `${topVal}px`)
            .show()
            .stop()
            .fadeIn(() => {
                $compassIcon.fadeOut();
            });
    }
};
const initCompassIcon = () => {
    const $root = $('#root');
    const $app = $root.find('.app');

    $app.scroll(locationCompass);

    $(window).resize(locationCompass);
};

export default initCompassIcon;