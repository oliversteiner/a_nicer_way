/**
 *  timewayController
 *
 */
var TimewayController = (function () {
    /**
     * constructor
     */
    function TimewayController() {
        console.log(this.className);
        // Vars
        this.className = 'timewayController';
        this.idName = 'timeway';
        this.elem_Root = document.getElementById(this.idName);
        // functions
        this.addAllEventsListeners();
        // console
    }
    /**
     * addAllEventsListeners
     */
    TimewayController.prototype.addAllEventsListeners = function () {
    };
    return TimewayController;
}());
