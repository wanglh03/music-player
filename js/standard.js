function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function isEmptyObj(o) {
    for (var p in o) return false;
    return true;
}
function getOffset(el) {
    var parent = el.offsetParent,
        left = el.offsetLeft,
        top = el.offsetTop;

    while (parent !== null) {
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }

    return {
        left: left,
        top: top
    };
}