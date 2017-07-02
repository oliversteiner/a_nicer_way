/**
 *  aNicerWay
 *
 */
var _update_list_zaehler = 0;
var _update_point_zaehler = 0;
var _update_loadTimeWayPoint_zaehler = 0;
var ANicerWay = (function () {
    /**
     *
     *
     * @param options
     */
    function ANicerWay(options) {
        // Version
        this.version = '1.7b';
        // Status
        this.isMobile = true;
        // Options
        this.simulator_size = 'mittel';
        this.check_for_mobile = true;
        this.socket_io = true;
        // Optionen
        if (options.simulator_size) {
            this.simulator_size = options.simulator_size;
        }
        if (options.check_for_mobile === false) {
            this.check_for_mobile = false;
        }
        if (options.socket_io === false) {
            this.socket_io = false;
        }
        // DB
        this.db = new PouchDB('anicerway');
        // Init
        this.setVersion();
        this.addKeystrokes();
        this.detectMobile();
    }
    ANicerWay.prototype.start = function () {
        this.loadComponents();
        this.update();
        this.addEventListeners();
        this.goTo();
    };
    ANicerWay.prototype.update = function () {
        this.updateList();
        this.updatePoint();
    };
    ;
    ANicerWay.prototype.updateList = function () {
        _update_list_zaehler++;
        this.loadTimeWayPointList();
        var speed = 100;
        var trying = 20;
        var timer2 = setInterval(tryList, speed);
        var counter = 0;
        function tryList() {
            counter++;
            // remove timer after interating through all articles
            if (counter >= trying) {
                clearInterval(timer2);
            }
            var list = aNicerWay.getTimeWayPointList();
            if (list != 0) {
                // Navigation
                aNicerWay.navigationController.setList(list);
                aNicerWay.navigationController.update();
                // timeWayPoint
                aNicerWay.timeWayController.setList(list);
                aNicerWay.timeWayController.update();
                // Editor
                aNWEditor.editorSlidesController.setList(list);
                aNWEditor.editorSlidesController.update();
                // Remote
                socketIOService.sendList(list);
                clearInterval(timer2);
            }
        }
    };
    ANicerWay.prototype.updatePoint = function () {
        _update_point_zaehler++;
        var speed = 50;
        var trying = 20;
        var timerPoint = setInterval(tryList, speed);
        var counter = 0;
        function tryList() {
            counter++;
            // remove timer after interating through all articles
            if (counter >= trying) {
                clearInterval(timerPoint);
            }
            var doc = aNicerWay.timeWayPoint_Now_Doc;
            if (doc) {
                var message = 'TimeWayPoint: <span class="message-ok">' + doc.sequence + '</span>';
                SmartphoneSimController.message(message);
                TimeWayController.scrollTo(doc._id);
                DataDisplayController.setData(doc);
                StatusDisplayController.setData(doc);
                socketIOService.sendTimePointNr(doc.sequence);
                // Hype Steuern
                // warte eine halbe sekunde
                // erst wenn fertig gescrollt:
                setTimeout(function () {
                    hypeService.action(doc.hype);
                }, 500);
                clearInterval(timerPoint);
            }
        }
    };
    /**
     *
     *
     */
    ANicerWay.prototype.loadComponents = function () {
        this.consoleController = new ConsoleController();
        this.dataDisplayController = new DataDisplayController();
        this.smartphoneSimController = new SmartphoneSimController(this.simulator_size);
        this.statusDisplayController = new StatusDisplayController();
        this.navigationController = new NavigationController();
        this.timeWayController = new TimeWayController();
        this.remoteDisplayController = new RemoteDisplayController();
        this.characterController = new CharacterController();
        this.displayController = new DisplayController();
    };
    /**
     * addEventsListeners
     *
     */
    ANicerWay.prototype.addEventListeners = function () {
        //
        $('.navigation-button-next').click(aNicerWay.goToNext);
        //
        $('.navigation-button-previous').click(aNicerWay.goToPrevious);
    };
    /**
     * addKeystrokes
     */
    ANicerWay.prototype.addKeystrokes = function () {
        // Pfeil nach Links
        key('left', function () {
            aNicerWay.goToPrevious();
        });
        // Pfeil nach rechts
        key('right', function () {
            aNicerWay.goToNext();
        });
        // Pfeil nach oben
        key('up', function () {
            aNicerWay.goToLast();
        });
        // Pfeil nach unten
        key('down', function () {
            aNicerWay.goToFirst();
        });
    };
    /**
     *
     *
     */
    ANicerWay.prototype.loadTimeWayPointList = function () {
        this.timeWayPoint_ListDocs = false;
        this.timeWayPoint_First_ID = false;
        this.timeWayPoint_Last_ID = false;
        this.db.allDocs({
            include_docs: true,
            startkey: 'TimeWayPoint',
            endkey: 'TimeWayPoint\uffff'
        }).then(function (docs) {
            // Wenn keine Timepoints vorhanden, standart einlesen:
            if (docs.rows.length === 0) {
                // Zeige Modal mit DB abfrage
                aNicerWay.showDBModal();
            }
            else {
                var unorderd_list = docs.rows;
                // sort
                var list_docs_1 = [];
                var list_sequence_1 = [];
                $.each(unorderd_list, function (index, row) {
                    var number = row.doc.sequence;
                    list_docs_1[number] = row.doc;
                    list_sequence_1[number] = row.doc._id;
                });
                var count = list_docs_1.length - 1;
                var firstID = list_docs_1[1]._id;
                var lastID = list_docs_1[count]._id; // Arrays beginnen bei NULL, alse einen abziehen
                aNicerWay.timeWayPoint_First_ID = firstID;
                aNicerWay.timeWayPoint_Last_ID = lastID;
                aNicerWay.timeWayPoint_ListDocs = list_docs_1;
                aNicerWay.timeWayPoint_ListSequence = list_sequence_1;
            }
            return docs;
        }).catch(function (err) {
            console.log(err);
        });
    };
    ANicerWay.prototype.showDBModal = function () {
        ANicerWay.openModalCenter();
        $('#init-DB-message-wrapper').show();
    };
    /**
     *
     * @param id
     */
    ANicerWay.prototype.loadTimeWayPointFromDB = function (id) {
        this.timeWayPoint_Now_Doc = false;
        this.timeWayPoint_Now_ID = false;
        if (!id) {
            id = this.getFirstTimeWayPoint();
        }
        this.db.get(id).catch(function (err) {
            if (err.name === 'not_found') {
                console.log('- not found');
                return {};
            }
            else {
                throw err;
            }
        }).then(function (doc) {
            aNicerWay.timeWayPoint_Now_Doc = doc;
            aNicerWay.timeWayPoint_Now_ID = doc._id;
        }).catch(function (err) {
            // handle any errors
            console.error(err);
        });
        // Auf das Dokument kann zugegriffen werden über:
        //    .then( function(doc){ doc })
    };
    ANicerWay.prototype.loadTimeWayPoint = function (id) {
        _update_loadTimeWayPoint_zaehler++;
        var speed = 50;
        var trying = 20;
        var timerLoadPoint = setInterval(tryList, speed);
        var counter = 0;
        function tryList() {
            counter++;
            // Nach 20 Versuchen abbrechen
            if (counter >= trying) {
                clearInterval(timerLoadPoint);
            }
            // Liste
            var id_list = aNicerWay.timeWayPoint_ListSequence;
            if (id_list) {
                clearInterval(timerLoadPoint);
                var sequence_nr = 0;
                if (!id) {
                    // Keine ID angegeben ? Den ersten Eintrag nehmen
                    sequence_nr = 1;
                    id = id_list[1];
                    //  Erste
                    aNicerWay.timeWayPoint_First_ID = id_list[1];
                    // letze
                    aNicerWay.timeWayPoint_Last_ID = id_list[id_list.length - 1];
                    // nächstes
                    aNicerWay.timeWayPoint_Next_ID = id_list[2];
                    // Vorheriges
                    aNicerWay.timeWayPoint_Previous_ID = id_list[1];
                }
                else {
                    for (var i = 0; i < id_list.length; i++) {
                        // Aktuell
                        if (id_list[i] == id) {
                            sequence_nr = i;
                            // nächstes
                            aNicerWay.timeWayPoint_Next_ID = id_list[i + 1];
                            // Vorheriges
                            aNicerWay.timeWayPoint_Previous_ID = id_list[i - 1];
                        }
                    } // Ende for
                    // Erster TimeWayPoint
                    aNicerWay.timeWayPoint_First_ID = id_list[1];
                    // Letzter TimeWayPoint
                    aNicerWay.timeWayPoint_Last_ID = id_list[id_list.length - 1];
                }
                // Aktuelles Doc laden:
                aNicerWay.timeWayPoint_Now_ID = id;
                var doc = aNicerWay.timeWayPoint_ListDocs[sequence_nr];
                aNicerWay.timeWayPoint_Now_Doc = doc;
                return doc;
            } // Trylist
        }
    };
    // GET
    ANicerWay.prototype.getTimeWayPointList = function () {
        return this.timeWayPoint_ListDocs;
    };
    ANicerWay.prototype.getTimeWayPoint = function () {
        return this.timeWayPoint_Now_Doc;
    };
    ANicerWay.prototype.getLastTimeWayPoint = function () {
        return this.timeWayPoint_Last_ID;
    };
    ANicerWay.prototype.getFirstTimeWayPoint = function () {
        return this.timeWayPoint_First_ID;
    };
    ANicerWay.prototype.getNextTimeWayPoint = function () {
        return this.timeWayPoint_Next_ID;
    };
    ANicerWay.prototype.getPrevioussTimeWayPoint = function () {
        return this.timeWayPoint_Previous_ID;
    };
    // Set
    ANicerWay.prototype.setTimeWayPointList = function () {
        this.loadTimeWayPointList();
        this.updateList();
    };
    ANicerWay.prototype.setTimeWayPoint = function (id) {
        this.loadTimeWayPoint(id);
        this.updatePoint();
    };
    ANicerWay.prototype.setLastTimeWayPoint = function (id) {
    };
    ANicerWay.prototype.setFirstTimeWayPoint = function (id) {
    };
    ANicerWay.prototype.setNextTimeWayPoint = function (id) {
    };
    ANicerWay.prototype.setPrevioussTimeWayPoint = function (id) {
    };
    // goTo
    ANicerWay.prototype.goTo = function (id) {
        aNicerWay.setTimeWayPoint(id);
    };
    ANicerWay.prototype.goToLast = function () {
        var id = aNicerWay.timeWayPoint_Last_ID;
        aNicerWay.setTimeWayPoint(id);
    };
    ANicerWay.prototype.goToFirst = function () {
        var id = aNicerWay.timeWayPoint_First_ID;
        aNicerWay.setTimeWayPoint(id);
    };
    ANicerWay.prototype.goToNext = function () {
        var id = aNicerWay.timeWayPoint_Next_ID;
        aNicerWay.setTimeWayPoint(id);
    };
    ANicerWay.prototype.goToPrevious = function () {
        var id = aNicerWay.timeWayPoint_Previous_ID;
        aNicerWay.setTimeWayPoint(id);
    };
    // Version
    ANicerWay.prototype.setVersion = function () {
        $('.version').text(this.version);
        return this.version;
    };
    ANicerWay.openModalCenter = function () {
        $('#remote-modal-how-open').hide();
        $('#remote-modal-change-directly').hide();
        $('#init-DB-message-wrapper').hide();
        $('#init-DB-progress-wrapper').hide();
        // Modal öffnen
        $('#modal-center').modal('show');
    };
    ANicerWay.closeModalCenter = function () {
        $('#remote-modal-how-open').hide();
        $('#remote-modal-change-directly').hide();
        $('#init-DB-message-wrapper').hide();
        $('#init-DB-progress-wrapper').hide();
        // Modal öffnen
        $('#modal-center').modal('hide');
    };
    ANicerWay.prototype.detectMobile = function () {
        if (this.check_for_mobile === true) {
            $(document).ready(function () {
                var isMobile = window.matchMedia("only screen and (max-width: 760px)");
                if (isMobile.matches) {
                    //Conditional script here
                    console.log('mobile detected');
                    // speichern
                    aNicerWay.isMobile = true;
                    // Anzeige starten, ob zu Remote-Seite wechseln
                    ANicerWay.openModalCenter();
                    $('#remote-modal-change-directly').show();
                    $('#modal-center').modal('show').on('shown.bs.modal', function () {
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
                                $('#modal-center').modal('hide');
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
