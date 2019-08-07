const hideMainScrollerbar = () => {
    const $root = $('#root');
    const offsetWidth = $root.find('.app').prop('offsetWidth');
    const clientWidth = $root.find('.app').prop('clientWidth');
    const offsetVal = Math.abs(offsetWidth - clientWidth);

    $root.find('.app').css('margin-right', `-${offsetVal}px`);
};

export default hideMainScrollerbar;