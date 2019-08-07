const changeBG = () => {
    const $root = $('#root');
    const $app = $root.find('.app');
    const navbarHeight = $app.find('.page-section-header').height();
    const scrollTopVal = $app.scrollTop();
    let rgbVal = 255 - 25 * (scrollTopVal / navbarHeight);

    rgbVal = (rgbVal < 225) ? 225 : rgbVal;

    $app.find('.page-section-header').css('background-color', `rgb(${rgbVal}, ${rgbVal}, ${rgbVal})`);
};
const initNavbarBG = () => {
    const $root = $('#root');
    const $app = $root.find('.app');

    changeBG();

    $app.scroll(changeBG);
};

export default initNavbarBG;