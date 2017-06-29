var options = {
    simulator_size: 'mittel',
    socket_io: true,
    check_for_mobile: true // true, false
};
$(document).ready(function () {
    // A Nicer Way
    aNicerWay = new ANicerWay(options);
    aNicerWay.start();
    // Services:
    hypeService = new HypeService();
    pouchDBService = new PouchDBService();
    socketSimulatorService = new SocketSimulatorService();
    socketIOService = new SocketIOService();
    // Editor
    aNWEditor = new AnwEditor();
    aNWEditor.start();
});
// https://codepen.io/anon/pen/oXRZYO?editors=001
$(document).ready(function () {
    var main = $('#main'), index = $('.project-index'), figure = index.find('figure'), overflow, resized, placed = 0, middle = main.width() / 2, figure_width = figure.width(), num_figures = figure.length, num_row_figures = Math.ceil(num_figures / 2), row_width = figure_width * num_row_figures, momentum = typeof ($('body')[0].style['-webkit-overflow-scrolling']) != 'undefined';
    index.width(row_width);
    if (!momentum) {
        main.css('overflow', 'hidden');
        index.drag();
        setDimensions();
        $(window).on('mouseup touchend', getOffset).resize(setDimensions);
        $('body').mouseleave(getOffset);
    }
    function setDimensions() {
        clearTimeout(resized);
        var inner = main.width() / 2;
        overflow = Math.max(0, row_width - 2 * inner);
        var parent_width = row_width + overflow;
        $('#container').css({ width: parent_width, left: -overflow });
        resized = setTimeout(function () {
            var seat = Math.min(overflow, Math.max(0, overflow - placed + inner - middle));
            index.css('left', seat);
            getOffset();
            middle = inner;
        }, 50);
    }
    function getOffset() {
        placed = overflow - index.position().left;
    }
});
(function ($) {
    $.fn.drag = function () {
        var object = this, limit = this.parent(), now, swipe, press = 'mousedown touchstart', move = 'mousemove touchmove', release = 'mouseup touchend';
        if (window.requestAnimationFrame)
            var neoteric = true;
        this.on(press, function (e) {
            if (e.type == 'mousedown' && e.which != 1)
                return;
            var margin = limit.width() - object.outerWidth(), old = object.position().left, touch = e.originalEvent.touches, start = touch ? touch[0].pageX : e.pageX;
            $(window).on(move, function (e) {
                var contact = e.originalEvent.touches, end = contact ? contact[0].pageX : e.pageX;
                now = Math.max(0, Math.min(old + end - start, margin));
                if (Math.abs(end - start) > 30)
                    swipe = true;
                if (neoteric)
                    requestAnimationFrame(setElement);
                else
                    setElement();
            })
                .one(release, function (e) {
                e.preventDefault();
                swipe = false;
                $(this).off(move).off(release);
            });
            e.preventDefault();
        })
            .find('a').on(press, function () {
            var destination = $(this).attr('href');
            $(this).one(release, function () {
                if (destination && !swipe)
                    window.location = destination;
                $(this).off(release);
            });
        }).click(function () {
            return false;
        });
        $('body').mouseleave(function () {
            swipe = false;
            $(window).off(move).off(release);
        });
        return this;
        function setElement() {
            object.css('left', now);
        }
    };
}(jQuery));
