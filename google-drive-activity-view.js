javascript: (function() {
    var pages = 100;
    var newWidth = 700;
    var startNode = document.getElementsByClassName('a-ub-Gd')[0];
    var node = startNode;
    node.style.width = newWidth - 9 + 'px';
    node = node.parentNode;
    node.style.width = newWidth + 'px';
    node = node.parentNode;
    node.style.width = newWidth + 'px';
    node = node.parentNode;
    node.style.width = newWidth + 'px';
    node = node.parentNode;
    node.style.width = newWidth + 'px';
    node = node.parentNode;
    node.style.width = newWidth + 'px';
    var nodeToDelete = document.getElementsByClassName('a-s-tb-sc-Ja-Q a-s-tb-sc-Ja-Q-Nm a-s-tb-Pe-Q a-D-Pe-Q');
    if (nodeToDelete.length > 0) {
        node = nodeToDelete[0];
        node.parentNode.removeChild(node);
    }
    nodeToDelete = document.getElementsByClassName('a-ub-D');
    if (nodeToDelete.length > 0) {
        node = nodeToDelete[0];
        node.parentNode.removeChild(node);
    }
    var colorize = function(backgroundColoring) {
        var els, i; /* see htmlcolorcodes.com */
        if (backgroundColoring == true) {
            var colors = new Map([
                ['red', '#fe4c26'],
                ['orange', '#ffb260'],
                ['yellow', '#fff984'],
                ['green', '#a0ff6d'],
                ['violet', '#C843DC']
            ]);
        } else {
            var colors = new Map([
                ['red', '#e00000'],
                ['orange', '#ff8300'],
                ['yellow', '#ead100'],
                ['green', '#2bb100'],
                ['violet', '#b600d1']
            ]);
        }
        var keywords = new Map();
        keywords.set('trash', colors.get('red'));
        keywords.set('removed', colors.get('red'));
        keywords.set('deleted', colors.get('red'));
        keywords.set('restricted', colors.get('red'));
        keywords.set('Anyone with the link', colors.get('orange'));
        keywords.set('edited', colors.get('orange'));
        keywords.set('made a copy', colors.get('yellow'));
        keywords.set('moved', colors.get('yellow'));
        keywords.set('renamed', colors.get('yellow'));
        keywords.set('shared', colors.get('yellow'));
        keywords.set('changed permissions', colors.get('yellow'));
        keywords.set('created', colors.get('green'));
        keywords.set('uploaded', colors.get('green'));
        keywords.set('restored', colors.get('green'));
        keywords.set('automatically placed', colors.get('green'));
        keywords.set('added', colors.get('green'));
        keywords.set('commented', colors.get('green'));
        keywords.set('You', colors.get('green'));
        keywords.set('Yesterday', colors.get('violet'));
        keywords.set('Earlier this week', colors.get('violet'));
        keywords.set('Last week', colors.get('violet'));
        keywords.set('Earlier this month', colors.get('violet'));
        keywords.set('Last month', colors.get('violet'));
        keywords.set('Earlier this year', colors.get('violet'));
        keywords.set('Last year', colors.get('violet'));
        keywords.set('Long ago', colors.get('violet'));

        function searchNode(node, te, len) {
            var pos, skip = 0,
                spannode, middlebit, endbit, middleclone;
            if (node.nodeType == 3) {
                pos = node.data.toUpperCase().indexOf(te);
                if (pos >= 0) {
                    spannode = document.createElement('SPAN');
                    spannode.className = 'hiColor_' + te.replace(/ /g, "_");
                    /*console.log('hiColor_'+te.replace(/ /g,"_"));*/
                    middlebit = node.splitText(pos);
                    endbit = middlebit.splitText(len);
                    middleclone = middlebit.cloneNode(true);
                    spannode.appendChild(middleclone);
                    middlebit.parentNode.replaceChild(spannode, middlebit);
                    skip = 1;
                }
            } else if (node.nodeType == 1 && node.childNodes && node.tagName.toUpperCase() != 'SCRIPT' && node.tagName.toUpperCase != 'STYLE') {
                for (var child = 0; child < node.childNodes.length; ++child) {
                    child = child + searchNode(node.childNodes[child], te, len);
                }
            }
            return skip;
        }
        for (var [key, value] of keywords) {
            searchNode(document.body, key.toUpperCase(), key.length);
            els = document.querySelectorAll('.hiColor_' + key.toUpperCase().replace(/ /g, "_"));
            /*console.log('.hiColor_'+key.toUpperCase().replace(/ /g,"_"));*/
            if (els && els.length) {
                for (var i = 0; i < els.length; i++) {
                    if (backgroundColoring == true) {
                        els[i].style.backgroundColor = value;
                    } else {
                        els[i].style.color = value;
                        els[i].style.fontWeight = 'bold';
                    }
                }
            }
        }
        return null;
    };
    var scrollTimeout = 300;
    var scrollDown = function() {
        document.body.getElementsByClassName('y-E g-oe')[0].scrollTop = 1000000;
        /*var currentPeriod = document.body.getElementsByClassName('y-E-gh-D')[0].lastChild.innerHTML;*/
        var periodElement = document.body.getElementsByClassName('y-C-Ed-V');
        var currentPeriod = periodElement.length == 0 ? "" : periodElement[9].innerHTML;
        pages -= 1;
        /*if (pages > 0) {*/
        if ((currentPeriod == "") || (currentPeriod == "Today") || (currentPeriod == "Yesterday")) {
            setTimeout(scrollDown, scrollTimeout);
        } else {
            /*document.body.getElementsByClassName('y-E g-oe')[0].scrollTop = 0;*/
            if (currentPeriod == "Earlier this week") {
                document.body.getElementsByClassName('y-E g-oe')[0].scrollTop = periodElement[2].offsetTop;
            } else if (currentPeriod == "Last week") {
                document.body.getElementsByClassName('y-E g-oe')[0].scrollTop = periodElement[3].offsetTop;
            }
            colorize(true);
        }
    };
    setTimeout(scrollDown, scrollTimeout);
})();
