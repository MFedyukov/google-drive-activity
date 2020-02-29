javascript: (function() {
    var els, i; /* see htmlcolorcodes.com e8c137*/
    /*var colors = new Map([['red', '#fe4c26'], ['orange', '#ffb260'], ['yellow', '#fff984'], ['green', '#a0ff6d'], ['grey', '#dfdfdf']]);*/
    var colors = new Map([
        ['red', '#e00000'],
        ['orange', '#ff8300'],
        ['yellow', '#ead100'],
        ['green', '#2bb100'],
        ['grey', '#b600d1']
    ]);
    var keywords = new Map();
    keywords.set('trash', colors.get('red'));
    keywords.set('removed', colors.get('red'));
    keywords.set('deleted', colors.get('red'));
    keywords.set('restricted access', colors.get('red'));
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
    keywords.set('Yesterday', colors.get('grey'));
    keywords.set('Earlier this week', colors.get('grey'));
    keywords.set('Last week', colors.get('grey'));

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
                /*els[i].style.backgroundColor = value;*/
                els[i].style.color = value;
                els[i].style.fontWeight = 'bold';
            }
        }
    }
    return null;
})();
