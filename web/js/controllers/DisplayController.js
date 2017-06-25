var Display = (function () {
    function Display(name) {
        this.name = name;
        var display = '#' + this.name + '-display-content';
        this.$display = $(display);
    }
    Display.prototype.hide = function () {
        this.$display.hide();
    };
    Display.prototype.show = function () {
        this.$display.show();
    };
    Display.prototype.toggle = function () {
        this.$display.toggle();
    };
    return Display;
}());
var DisplayController = (function () {
    function DisplayController() {
        this.displays = [];
        this.searchDisplays();
        return this.displays;
    }
    DisplayController.prototype.searchDisplays = function () {
        var $displays = $('.nicer-display');
        var displays = [];
        for (var i = 0; i < $displays.length; i++) {
            var display_ID = $($displays[i]).attr('id');
            var display_Key = $($displays[i]).data('keystroke');
            // den Namen kürzen und in die Variable stellen
            var display_name = display_ID.replace('-display-content', '');
            displays[i] = display_name;
            // EventListener aktivieren
            this.activate(display_ID, display_Key);
            // dynamische Objekte erstellen
            this.generate(display_name);
        }
        return displays;
    };
    DisplayController.prototype.generate = function (display_name) {
        var display = new Display(display_name);
        this.displays.push(display_name);
        this.displays[display_name] = display;
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
    return DisplayController;
}());
