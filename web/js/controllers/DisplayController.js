var DisplayController = (function () {
    function DisplayController() {
        this.searchDisplays();
    }
    DisplayController.prototype.searchDisplays = function () {
        var displayListe = $('.nicer-display');
        for (var i = 0; i < displayListe.length; i++) {
            var display_ID = $(displayListe[i]).attr('id');
            var display_Key = $(displayListe[i]).data('keystroke');
            this.activate(display_ID, display_Key);
        }
    };
    DisplayController.prototype.activate = function (display_id, display_Key) {
        var $display = $('#' + display_id);
        var display_name = display_id.replace('-content', '');
        $display.hide();
        // Close
        var closeButton = '#' + display_id + ' .display-close-button';
        var $closeButton = $(closeButton);
        // -- add EventListener
        $closeButton.click(function () {
            $display.hide();
        });
        // Toggle Close
        var toggleButton = '.' + display_name + '-toggle-button';
        var $toggleButton = $(toggleButton);
        // -- add EventListener
        $toggleButton.click(function () {
            $display.toggle();
        });
        // minimize
        var miniButton = '#' + display_id + ' .display-header';
        var $miniButton = $(miniButton);
        // content
        var main = '#' + display_id + ' .display-main';
        var $main = $(main);
        // -- add EventListener
        $miniButton.dblclick(function () {
            $main.slideToggle('fast');
        });
        // Draggable
        $display.draggable();
        if (display_Key) {
            // Keystroke
            key(display_Key, function () {
                $display.toggle();
            });
        }
        // flip
        var flipConteiner = '#' + display_id + ' .flip-container';
        var $flipConteiner = $(flipConteiner);
        if ($flipConteiner) {
            // content
            var flipButton = '#' + display_id + ' .flip-toggle-button';
            var $flipButton = $(flipButton);
            // -- add EventListener
            $flipButton.click(function () {
                $flipConteiner.toggleClass('flip');
            });
        }
    };
    /**
     *
     *
     * @param name
     */
    DisplayController.prototype.toggle = function (name) {
        // Toggle Close
        var display = '#' + name + '-display-content';
        var $display = $(display);
        // -- add EventListener
        $display.toggle();
    };
    return DisplayController;
}());
