var Panel = (function () {
    function Panel(name) {
        this.name = name;
        var panel = '#nicer-panel-' + this.name;
        this.$panel = $(panel);
    }
    Panel.prototype.hide = function () {
        this.$panel.hide();
    };
    Panel.prototype.show = function () {
        this.$panel.show();
    };
    Panel.prototype.toggle = function () {
        this.$panel.toggle();
    };
    return Panel;
}());
var PanelController = (function () {
    function PanelController() {
        this.panels = [];
        this.searchPanels();
        return this.panels;
    }
    PanelController.prototype.searchPanels = function () {
        var $panels = $('.nicer-panel');
        var panels = [];
        for (var i = 0; i < $panels.length; i++) {
            var panel_ID = $($panels[i]).attr('id');
            var panel_Key = $($panels[i]).data('keystroke');
            // den Namen kürzen und in die Variable stellen
            var panel_name = panel_ID.replace('nicer-panel-', '');
            panels[i] = panel_name;
            // EventListener aktivieren
            this.activate(panel_ID, panel_Key);
            // dynamische Objekte erstellen
            this.generate(panel_name);
        }
        return panels;
    };
    PanelController.prototype.generate = function (panel_name) {
        var panel = new Panel(panel_name);
        this.panels.push(panel_name);
        this.panels[panel_name] = panel;
    };
    PanelController.prototype.activate = function (panel_id, panel_Key) {
        var $panel = $('#' + panel_id);
        var panel_name = panel_id.replace('-content', '');
        $panel.hide();
        // Close
        var closeButton = '#' + panel_id + ' .-close-button';
        var $closeButton = $(closeButton);
        // -- add EventListener
        $closeButton.click(function () {
            $panel.hide();
        });
        // Toggle Close
        var toggleButton = '.' + panel_id + '-toggle-button';
        var $toggleButton = $(toggleButton);
        // -- add EventListener
        $toggleButton.click(function () {
            $panel.toggle();
        });
        // minimize
        var miniButton = '#' + panel_id + ' .nicer-panel-header';
        var $miniButton = $(miniButton);
        // content
        var main = '#' + panel_id + ' .nicer-panel-main';
        var $main = $(main);
        // -- add EventListener
        $miniButton.dblclick(function () {
            $main.slideToggle('fast');
            $miniButton.toggleClass('closed');
        });
        // section
        // --------------------------------------
        var section_header = '#' + panel_id + ' .nicer-panel-section-header';
        var $section_header = $(section_header);
        // -- add EventListener
        $section_header.dblclick(function () {
            var $section_main = $(this).parent().children('.nicer-panel-section-main');
            console.log($section_main);
            $section_main.slideToggle('fast');
            $(this).toggleClass('closed');
        });
        // options
        // --------------------------------------
        var options_button = '#' + panel_id + ' .nicer-panel-option-button';
        var $options_button = $(options_button);
        // -- add EventListener
        $options_button.click(function () {
            var $section_option = $(this).parent().parent().find('.nicer-panel-section-options');
            console.log($(this).parent().parent());
            console.log($section_option);
            $section_option.slideToggle('fast');
            $(this).toggleClass('closed');
        });
        // close
        // -- add EventListener
        $('.nicer-panel-close-button').click(function () {
            var $close_button = $(this).parent().parent();
            console.log($close_button);
            $close_button.hide();
        });
        // Draggable
        $panel.draggable();
        if (panel_Key) {
            // Keystroke
            key(panel_Key, function () {
                $panel.toggle();
            });
        }
        // flip
        var flipConteiner = '#' + panel_id + ' .flip-container';
        var $flipConteiner = $(flipConteiner);
        if ($flipConteiner) {
            // content
            var flipButton = '#' + panel_id + ' .flip-toggle-button';
            var $flipButton = $(flipButton);
            // -- add EventListener
            $flipButton.click(function () {
                $flipConteiner.toggleClass('flip');
            });
        }
    };
    return PanelController;
}());
