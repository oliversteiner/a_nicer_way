/*!
 * GridHelper for Bootstrap v0.1 (http://mollo.com/gridHelpter)
 * Copyright 2015 Oliver Steiner
 * Licensed under MIT (https://github.com/twbs/GridHelper_for_bootstrap/blob/master/LICENSE)
 */

// GridHelper Options
// ======================

var options = {
    start: 'auto',     // auto | click | silent
    position: 'center',     // left | center | right
    popover_trigger: 'click'  // click | hover | focus | manual.
};

// Init Class
// ======================
$(document).ready(function () {
    gridhelper = new GridHelper(options);
    gridhelper.init();
});

// update the information on resizing
$(window).resize(function () {
    gridhelper.viewPort();
    gridhelper.updateColPanel();

});


// GridHelper CLASS DEFINITION
// ======================

function GridHelper(options) {
    this.viewport = 0;
    this.on = 0;
    this.on_silent = 0;
    this.on_popover = 0;
    this.options = options;
    this.modes = "col";
    this.cols = 0;
}


// init
// ======================

GridHelper.prototype.init = function () {

    this.addGripHelperMonitor();
    this.viewPort();
    this.markColumns();
    this.addColPanel();
    this.on = true;

    $('#gridhelper-onoff-button').click(function () {
        gridhelper.toggle();
    });

    $('#gridhelper-popover-button').click(function () {
        gridhelper.toggleAllPopovers();
    });

    // Start Options
    if (this.options.start == 'click') {
        this.hide();
    }
    // to start manually: type in console: 'gridhelper.go()'
    else if (this.options.start == 'silent') {
        this.silent();
    }

    // Options and Init of Popover with classnames
    $('[rel=gh-popover]').popover({
        html: true,
        container: '',
        trigger: this.options.popover_trigger,
        placement: 'right',
        content: function () {
            return $($(this).data('contentwrapper')).html();
        }
    });
    $('[data-toggle="tooltip"]').tooltip();


    $(".ghb-infopanel").hover(function () {
        $(this).parent().children('.ghb-marc').addClass('ghb-marc-active');
    }, function () {
        $(this).parent().children('.ghb-marc').removeClass('ghb-marc-active');
    });

};

// viewport
// ======================

GridHelper.prototype.viewPort = function () {

    var width = $(window).width();

    if (width <= 480) {
        // XXS - violet
        // Landscape phones and smaller */
        // max-width: 480px
        this.viewport = 'xxs';
    }


    else if (width < 768) {
        // XS - BLUE
        // Landscape phones and portrait tablets */
        // min-width:767px
        this.viewport = 'xs';
    }

    else if (width < 992) {
        // SM - RED
        // Portrait tablets and small desktops */
        // min-width: 768px
        // max-width: 991px
        this.viewport = 'sm';
    }

    else if (width < 1200) {
        // MD - Yellow
        //  Portrait tablets and medium desktops */
        // min-width: 992px
        // max-width: 1199px
        this.viewport = 'md';
    }

    else if (width >= 1200) {
        // LG - green
        // Large desktops and laptops
        // min-width: 1200px
        this.viewport = 'lg';
    }

    else {
        this.viewport = null;

    }

    $('#responsive-status').attr('class', this.viewport);

    return this.viewport;

};


// Mark Columns
// ======================

GridHelper.prototype.markColumns = function () {

    // var all_col = $("[class*=col-]");
    var all_col = $(".row").children();

    all_col.addClass('ghb-col'); // GridHelperBootstrap-column
};


// Add InfoPanel to all Columns
// ======================

GridHelper.prototype.addColPanel = function () {

    var all_col = $(".ghb-col");


    // foreach col take all classes and show on Panel
    $.each(all_col, function () {

        var id = "ghb-" + gridhelper.cols;

        var info_panel = '<div class="ghb-marc" id="' + id + '-marc"></div>'
            + '<div class="ghb-infopanel" id="' + id + '" '
                //  + 'onmouseover="gridhelper.markColumn(\''+id+'\')"'
                //  + 'mouseout="gridhelper.alert()"
            + '>'
            + '<div class="ghb-select ghb-info-col" data-toggle="tooltip" data-placement="top" data-original-title="col"></div>'
            + '<div class="ghb-select ghb-info-offset" data-toggle="tooltip" data-placement="top" data-original-title="offset"></div>'
            + '<div class="ghb-select ghb-info-push" data-toggle="tooltip" data-placement="top" data-original-title="push"></div>'
            + '<div class="ghb-select ghb-info-pull" data-toggle="tooltip" data-placement="top" data-original-title="pull"></div>'
            + '<div class="ghb-info-hide"></div>'
            + '<div class="ghb-info-code"></div>'
            + '</div>';

        // add the infoPanel to each div.row >div
        $(this).prepend(info_panel);
        // add the Popover who shows the ClassNames
        gridhelper.addPopover(id);
        gridhelper.cols++;


    });
    // add all Input-elements
    this.updateColPanel();
};


// Updates the Input-Elements of the InfoPanel
// ======================

GridHelper.prototype.updateColPanel = function () {

    var all_cols = gridhelper.cols;

    for (var i = 0; i < all_cols; i++) {

        var id = "ghb-" + i;

        // add input Element Select
        gridhelper.addInput(id, 'col');
        gridhelper.addInput(id, 'offset');
        gridhelper.addInput(id, 'push');
        gridhelper.addInput(id, 'pull');

    }
};


// show computed classes
// ======================

GridHelper.prototype.getColNumber = function (id, modes) {
    var col_number = "0";

    var mod = "";

    switch (modes) {
        case "offset":
            mod = "-offset";
            break;
        case "pull":
            mod = "-pull";
            break;
        case "push":
            mod = "-push";
            break;
        default :
            mod = "";
            break;
    }

    var elem = $("#" + id).parent();
    var all_names = elem.attr('class');

    var regex = new RegExp("col-" + this.viewport + mod + "-([0-9+]{1,2})");

    var class_names = (" " + all_names + " ").match(regex);

    if (class_names) {
        col_number = parseInt(class_names[1], 10);
    }

    if (isNaN(col_number)) {
        col_number = 0;
    }

    return col_number;
};


// show computed classes
// ======================

GridHelper.prototype.addPopover = function (id) {
    var status;

    if (id != null) {

        var all_class_names = this.getClassNames(id);

        var html = '<a tabindex="0" ' +
            'id="#popover_' + id + '"' +
            'role="button" ' +
            'onclick="gridhelper.updatePopover(\'' + id + '\');" ' +
            'rel="gh-popover" ' +
            'class="btn-small"' +
            'data-toggle="popover" ' +
            'data-html="true" ' +
            'data-contentwrapper="#popover_data_' + id + '"' +
            'data-content="' +
            '">' +
            '<span class="glyphicon glyphicon-comment" aria-hidden="true"></span>' +
            '</a><div style="display: none" id="popover_data_' + id + '">' +
            all_class_names +
            '</div>';

        $("#" + id).children('.ghb-info-code').html(html);
    }

};


// show computed classes
// ======================

GridHelper.prototype.getClassNames = function (id) {

    var html_names = null;

    var all_class_names = $("#" + id).parent().attr("class");

    // put all classes in array
    var str = all_class_names.trim();
    str = str.replace('ghb-col', '');
    var arr = str.split(' ');
    arr.sort();

    //  add viewport-color
    html_names = '<ul class="popover-list">';
    arr.forEach(function (elem) {
        // add css group
        // add in list
        if (elem != '') {

            var viewport = '';

            if (elem.substring(0, 4) == 'col-') {
                viewport = elem.substring(4, 6);
            }
            html_names += '<li class="' + viewport + '">' + elem + '</li>';
        }
    });
    html_names += '</ul>';

    return html_names;
};


// show computed classes
// ======================

GridHelper.prototype.removeClassNames = function (id, modes) {

    if (modes == "col") {
        modes = ""
    } else {
        modes = modes + "-"
    }

    var class_name = '';
    var root = $("#" + id).parent();

    var regex = new RegExp("col-" + gridhelper.viewport + "-" + modes + "[0-9+]{1,2}");
    var search_for_class = new RegExp(regex);

    var classes = root.attr("class").split(' ');

    for (var i = 0; i < classes.length; i++) {
        if (classes[i].match(search_for_class)) {
            class_name += classes[i] + ' ';
        }
    }

    $(root).removeClass(class_name);

    return class_name;
};


// init Input:selects on InfoPanel
// ======================

GridHelper.prototype.addInput = function (id, modes) {

    var html = this.inputElemSelect(id, modes);
    $("#" + id).children('.ghb-info-' + modes).html(html);

};


// inputElemSelect
// ======================

GridHelper.prototype.inputElemSelect = function (id, modes) {

    var selected = "";
    var col_number = this.getColNumber(id, modes);
    var html = "";

    if (this.viewport !== "xxs") {

        html = "<select onchange = gridhelper.updateColNumber('" + id + "','" + modes + "') class='ghb-select' id='" + modes + "_" + id + "'>";

        for (var i = 0; i <= 12; i++) {
            if (col_number == i) {
                selected = "selected";
            }
            else {
                selected = "";
            }
            html = html + "<option " + selected + " value = '" + i + "'>" + i + "</option>";
        }
        html = html + "</select>";

    }

    return html;
};


// updateColNumber
// ======================

GridHelper.prototype.updateColNumber = function (id, modes) {

    var modes2 = "";

    var elem = $("#" + modes + "_" + id);

    var root = $("#" + id).parent();

    var col_number = elem.val();

    if (modes == "col") {
        modes2 = ""
    } else {
        modes2 = modes + "-"
    }

    var newClass = "col-" + this.viewport + "-" + modes2 + col_number;

    this.removeClassNames(id, modes);

    root.addClass(newClass);

    this.updatePopover(id);
};


// show computed classes
// ======================

GridHelper.prototype.updatePopover = function (id) {

    var html = this.getClassNames(id);

    $('#popover_data_' + id).html(html);
    $('#' + id).children('.ghb-info-code').children().children('.popover-content').html(html);

    return html;
};

// hide Popovers
// ======================

GridHelper.prototype.hideAllPopovers = function () {

    $('[rel=gh-popover]').popover('hide');
    $('#gridhelper-popover-picto').removeClass('active');

    this.on_popover = false;
};


// show Popovers
// ======================

GridHelper.prototype.showAllPopovers = function () {

    $('[rel=gh-popover]').popover('show');
    $('#gridhelper-popover-picto').addClass('active');
    this.on_popover = true;
};


// Toggle Popovers
// ======================

GridHelper.prototype.toggleAllPopovers = function () {

    if (this.on_popover == true) {
        this.hideAllPopovers();
    } else if (this.on_popover == false) {
        this.showAllPopovers();
    }
};


// hide
// ======================

GridHelper.prototype.silent = function () {
    $('#gridhelper-monitor').hide();

    this.hide();
    this.on_silent = true;
};


// go
// ======================

GridHelper.prototype.go = function () {
    $('#gridhelper-monitor').show();

    this.hide();
    this.on_silent = false;
};


// hide
// ======================

GridHelper.prototype.hide = function () {
    var all_col = $('.ghb-col');
    all_col.removeClass('ghb-col'); // GridHelperBootstrap-column

    var all_panels = $(".ghb-infopanel");
    all_panels.hide();

    $('#responsive-status').hide();
    $('#gridhelper-onoff-button-bottom').show();
    $('#gridhelper-onoff-button-top').hide();
    $('#gridhelper-onoff-text').hide();
    $('#gridhelper-popover-button').hide();

    this.on = false;
};


// show
// ======================

GridHelper.prototype.show = function () {

    this.markColumns();

    var all_panels = $(".ghb-infopanel");
    all_panels.show();

    $('#responsive-status').show();
    $('#gridhelper-onoff-button-bottom').hide();
    $('#gridhelper-onoff-button-top').show();
    $('#gridhelper-popover-button').show();
    $('#gridhelper-onoff-text').show();

    this.on = true;
};


// toggle
// ======================

GridHelper.prototype.toggle = function () {

    if (this.on === true) {
        this.hide();
    } else if (this.on === false) {
        this.show();
    }

};


// inputElemSelect
// ======================

GridHelper.prototype.addGripHelperMonitor = function () {

    // adjust the position depending on the options

    var html = "<div id='gridhelper-monitor' class='" + this.options.position + "'>"
        + "<a id='gridhelper-onoff-button'class='btn'>"
        + "<span id='gridhelper-onoff-text'>GridHelper</span>"
        + "<span id='gridhelper-onoff-button-top' class='glyphicon glyphicon-triangle-top' aria-hidden='true'></span>"
        + "<span id='gridhelper-onoff-button-bottom' class='btn-lg glyphicon glyphicon-triangle-bottom' aria-hidden='true' style='display: none'></span>"
        + "</a>"
        + "<div><span  id='responsive-status'></span>"
        + "<a id='gridhelper-popover-button'class='btn'><span id='gridhelper-popover-picto' class='glyphicon glyphicon-comment' aria-hidden='true'></span></a>"
        + "</div>"
        + "</div>";

    $('body').append(html, false);

};


// toggle
// ======================

GridHelper.prototype.markColumn = function (id) {

    this.demarkColumn();
    $("#" + id + "-hover").addClass("ghb-hover");


};

// toggle
// ======================

GridHelper.prototype.demarkColumn = function () {

    $(".ghb-hover").removeClass("ghb-hover");

};


// Helper-Function for Array
// http://stackoverflow.com/questions/5767325/remove-specific-element-from-an-array
// ======================
Object.defineProperty(Array.prototype, "removeItem", {
    enumerable: false,
    value: function (itemToRemove) {
        // Count of removed items
        var removeCounter = 0;
        // Iterate every array item
        for (var index = 0; index < this.length; index++) {
            // If current array item equals itemToRemove then
            if (this[index] === itemToRemove) {
                // Remove array item at current index
                this.splice(index, 1);

                // Increment count of removed items
                removeCounter++;
                index--;
            }
        }
        // Return count of removed items
        return removeCounter;
    }
});