javascript: (function() {
    var times = 1000;
    var scrollDown = function() {
        document.body.getElementsByClassName('y-E g-oe')[0].scrollTop = 10000000;
        times -= 1;
        if (times > 0) {
            setTimeout(scrollDown, 500);
        } else {
            document.body.getElementsByClassName('y-E g-oe')[0].scrollTop = 0;
        }
    };
    setTimeout(scrollDown, 500);
})();
