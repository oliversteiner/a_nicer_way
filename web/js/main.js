var aNicerWay;
var _aNicerWayVersion = '1.3b';
var _lastTimePoint = 1;
var _protectedInputs = ":input, textarea";
/**
 *  aNicerWay
 *
 */
var ANicerWay = (function () {
    /**
     *
     *
     * @param options
     */
    function ANicerWay(options) {
        // Version
        this.version = _aNicerWayVersion;
        // Status
        this.timePointAktuell = 1;
        this.firstTimePoint = 1;
        this.lastTimePoint = 0;
        this.isMobile = true;
        // Options
        this.simulator_size = 'gross';
        this.check_for_mobile = true;
        // Optionen
        this.simulator_size = options.simulator_size;
        this.check_for_mobile = options.check_for_mobile;
        // Optionen Default
        // Init
        this.setVersion();
        this.loadTimePoints();
        this.loadComponents();
        this.addAllEventsListeners();
        this.detectMobile();
    }
    /**
     *
     *
     */
    ANicerWay.prototype.loadComponents = function () {
        this.dbController = new DbController();
        this.dataDisplayController = new DataDisplayController();
        this.smartphoneSimController = new SmartphoneSimController(this.simulator_size);
        this.statusDisplayController = new StatusDisplayController();
        this.navigationController = new NavigationController();
        this.timewayController = new TimewayController();
        this.remoteDisplayController = new RemoteDisplayController();
    };
    /**
     * addAllEventsListeners
     *
     */
    ANicerWay.prototype.addAllEventsListeners = function () {
        // Keystrokes
        $(document).keypress(function (event) {
            var key = 104; // Taste "h"
            if (event.which === key && !$(document.activeElement).is(_protectedInputs)) {
                event.preventDefault();
                // Das Hilfsfenster ein / ausblenden
                $('#help-modal').modal('toggle');
            }
        });
    };
    ANicerWay.prototype.loadTimePoints = function () {
        console.log('loadTimePoints');
        var promise = DbController.loadAllWayPoints();
        return promise.then(function (doc) {
            var lastTimePoint = doc.rows.length;
            _lastTimePoint = doc.rows.length;
            // Wenn keine Timepoints vorhanden, standart einlesen:
            if (doc.rows.length === 0) {
                // Zeige Modal mit DB abfrage
                $('#modal-Init-DB').modal('show');
            }
            NavigationController.listAllWayPoints();
            aNicerWay.lastTimePoint = lastTimePoint;
            _lastTimePoint = lastTimePoint;
            return lastTimePoint;
        });
    };
    ANicerWay.updateTimePoints = function () {
        aNicerWay.loadTimePoints();
        TimewayController.generateWayPoints();
    };
    ANicerWay.prototype.setTimePoint = function (point) {
        // Test
        if (point < 0) {
            this.timePointAktuell = 1;
            return false;
        }
        else {
            this.timePointAktuell = point;
            return true;
        }
    };
    ANicerWay.prototype.getTimePoint = function () {
        return this.timePointAktuell;
    };
    ANicerWay.prototype.getLastTimePoint = function () {
        return this.lastTimePoint;
    };
    ANicerWay.prototype.getFirstTimePoint = function () {
        return this.firstTimePoint;
    };
    ANicerWay.prototype.setVersion = function () {
        $('.version').text(this.version);
        return this.version;
    };
    ANicerWay.prototype.detectMobile = function () {
        if (this.check_for_mobile) {
            $(document).ready(function () {
                var isMobile = window.matchMedia("only screen and (max-width: 760px)");
                if (isMobile.matches) {
                    //Conditional script here
                    console.log('mobile detected');
                    // speichern
                    aNicerWay.isMobile = true;
                    // Anzeige starten, ob zu Remote-Seite wechseln
                    $('#modalChangeToRemote').modal('show').on('shown.bs.modal', function () {
                        // Timer ablaufen lassen
                        var countdown = [3, 2, 1, 0];
                        var speed = 1000;
                        var timer = setInterval(lineAfterLine, speed);
                        var length = countdown.length;
                        var index = 0;
                        function lineAfterLine() {
                            var counter = countdown[index];
                            $('.go-remote-contdown-number').text(counter);
                            index++;
                            // remove timer after interating through all articles
                            if (index >= length) {
                                clearInterval(timer);
                                var pikto = '<span class="glyphicon glyphicon-sort "></span>';
                                $('.go-remote-contdown-number').html(pikto);
                                // Modal nach 4 sekunden beenden
                                $('#modalChangeToRemote').modal('hide');
                            }
                        }
                    });
                } // isMobile
            }); // ready
            return true;
        }
        else {
            return false;
        }
    };
    return ANicerWay;
}()); // Class
var options = {
    simulator_size: 'gross',
    check_for_mobile: false // klein, gross
};
$(document).ready(function () {
    aNicerWay = new ANicerWay(options);
});
function _reset() {
    // DbController.loadDefault();
    console.log('***** reset');
    // Datenbank leeren
    //   DbController.eraseDB();
    // Datenbank neu einlesen
    DbController.loadDefault();
    // Zeige die Prozess-bar
    $('#modal-Init-DB').modal('show');
    $('.init-DB-message-wrapper').hide();
    $('.progress-wrapper').show();
    // Animiere die Prozessbar
    $('.progress-bar').each(function () {
        var $bar = $(this);
        var progress = setInterval(function () {
            var currWidth = parseInt($bar.attr('aria-valuenow'));
            var maxWidth = parseInt($bar.attr('aria-valuemax'));
            var maxtimer = maxWidth + 25;
            //update the progress
            $bar.width(currWidth + '%');
            $bar.attr('aria-valuenow', currWidth + 5);
            //clear timer when max is reach
            if (currWidth >= maxtimer) {
                clearInterval(progress);
                $('#modal-Init-DB').modal('hide');
                $('.init-DB-message-wrapper').show();
                $('.progress-wrapper').hide();
                // Seite neu initialisieren
            }
        }, 100);
    });
    return false;
}
function _update_views() {
    ANicerWay.updateTimePoints();
}
