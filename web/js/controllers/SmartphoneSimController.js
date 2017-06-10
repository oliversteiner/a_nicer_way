/**
 *  SmartphoneSimController
 *
 */
var SmartphoneSimController = (function () {
    /**
     * constructor
     */
    function SmartphoneSimController() {
        console.log(this.className);
        // Vars
        this.isOpen = false;
        this.className = 'SmartphoneSimController';
        this.idName = 'smartphone-sim';
        this.elem_Root = document.getElementById(this.idName);
        this.elem_Frame = document.getElementById('smartphone-frame');
        this.elem_console = document.getElementById('smartphone-console');
        this.elem_Home = document.getElementById('smartphone-home-button');
        this.elem_Close = document.getElementById('smartphone-close');
        this.elem_Screen = document.getElementById('smartphone-screen');
        // functions
        this.addAllEventsListeners();
        $(this.elem_Frame).draggable();
        // blinkender Cursor
    }
    /**
     * addAllEventsListeners
     */
    SmartphoneSimController.prototype.addAllEventsListeners = function () {
        this.elem_Home.addEventListener('click', this.home.bind(this), false);
        this.elem_Close.addEventListener('click', this.toggle.bind(this), false);
    };
    SmartphoneSimController.prototype.home = function () {
        console.log('Homebutton gedrückt');
        $(this.elem_console).text('Home');
    };
    SmartphoneSimController.prototype.close = function () {
        console.log('SmartponeSim: Close');
        this.isOpen = false;
        $(this.elem_Root).addClass('smartphone-close');
        $('#smartphone-close-icon').removeClass('glyphicon-arrow-down').addClass('glyphicon-arrow-up');
    };
    SmartphoneSimController.prototype.open = function () {
        console.log('SmartponeSim: Open');
        this.isOpen = true;
        $(this.elem_Root).removeClass('smartphone-close');
        $('#smartphone-close-icon').removeClass('glyphicon-arrow-up').addClass('glyphicon-arrow-down');
        $(".console-cursor").effect("pulsate", { times: 10 }, 20000);
    };
    SmartphoneSimController.prototype.toggle = function () {
        console.log('SmartponeSim: toggle');
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    SmartphoneSimController.setContent = function (content) {
        var elem_Content = document.getElementById('smartphone-console');
        $(elem_Content).html(content);
    };
    return SmartphoneSimController;
}());
