/**
 *  phoneSimController
 *
 */
var PhoneSimController = (function () {
    /**
     * constructor
     */
    function PhoneSimController() {
        // Vars
        this.className = 'phoneSimController';
        this.idName = 'phone-sim';
        this.elem_Root = document.getElementById(this.idName);
        this.elem_Debug = document.getElementById('smartphone-debug');
        this.elem_Home = document.getElementById('smartphone-home-button');
        this.elem_Close = document.getElementById('smartphone-close');
        this.elem_Screen = document.getElementById('smartphone-screen-inner');
        // functions
        this.addAllEventsListeners();
        // debug
        console.log(this.className);
    }
    /**
     * addAllEventsListeners
     */
    PhoneSimController.prototype.addAllEventsListeners = function () {
        this.elem_Home.addEventListener('click', this.home.bind(this), false);
    };
    PhoneSimController.prototype.home = function () {
        console.log('Homebutton gedrückt');
        $(this.elem_Debug).text('Home');
    };
    return PhoneSimController;
}());
