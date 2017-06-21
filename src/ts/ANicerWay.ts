/**
 *  aNicerWay
 *
 */

let _update_list_zaehler = 0;
let _update_point_zaehler = 0;
let _update_loadTimeWayPoint_zaehler = 0;

class ANicerWay {


    // Version
    public version: string = '1.5b';

    // Status
    private timeWayPoint_Now_Doc: any;
    private timeWayPoint_Now_ID: any;
    private timeWayPoint_First_ID: any;
    private timeWayPoint_Last_ID: any;
    private timeWayPoint_Next_ID: string;
    private timeWayPoint_Previous_ID: string;
    private timeWayPoint_ListDocs: any;
    private timeWayPoint_ListSequence: any;

    // Status
    public isMobile: boolean = true;

    // Options
    public simulator_size: string = 'mittel';
    public check_for_mobile: boolean = true;

    // Controllers
    public dbController: DbController;
    public consoleController: ConsoleController;
    public dataDisplayController: DataDisplayController;
    public smartphoneSimController: SmartphoneSimController;
    public statusDisplayController: StatusDisplayController;
    public navigationController: NavigationController;
    public timeWayController: TimeWayController;
    public remoteDisplayController: RemoteDisplayController;
    public socketController: SocketController;

    // DB
    private db: any;

    // Socket io
    private socket: any;

    /**
     *
     *
     * @param options
     */
    constructor(options?: {
        simulator_size?: string,
        check_for_mobile?: boolean
    }) {

        // Optionen
        this.simulator_size = options.simulator_size;
        this.check_for_mobile = options.check_for_mobile;

        // Optionen Default


        // DB
        this.db = new PouchDB('anicerway');

        // Socket
        this.socket = io();


        // Init
        this.setVersion();
        this.addKeystrokes();
        this.detectMobile();
    }

    start() {
        this.loadComponents();
        this.update();
        this.addEventListeners();
        this.goTo();


    }

    update() {
        this.updateList();
        this.updatePoint();
    };

    updateList() {

        _update_list_zaehler++;
        console.log('** Update List : ' + _update_list_zaehler);

        this.loadTimeWayPointList();


        const speed = 100;
        const trying = 20;
        let timer2 = setInterval(tryList, speed);
        let counter = 0;

        function tryList() {

            counter++;
            // remove timer after interating through all articles
            if (counter >= trying) {
                clearInterval(timer2);
            }
            let list = aNicerWay.getTimeWayPointList();

            if (list != 0) {
                // Navigation
                aNicerWay.navigationController.setList(list);
                aNicerWay.navigationController.update();

                // timeWayPoint
                aNicerWay.timeWayController.setList(list);
                aNicerWay.timeWayController.update();

                aNicerWay.socket.emit('timepoint list', list);


                clearInterval(timer2);
            }
        }

        console.log('** List -- : ' + counter);
    }

    updatePoint() {
        _update_point_zaehler++;
        console.log('** Update Point : ' + _update_point_zaehler);

        const speed = 50;
        const trying = 20;
        let timerPoint = setInterval(tryList, speed);
        let counter = 0;

        function tryList() {

            counter++;
            // remove timer after interating through all articles
            if (counter >= trying) {
                clearInterval(timerPoint);
            }

            let doc = aNicerWay.timeWayPoint_Now_Doc;
            if (doc) {

                let message = 'TimeWayPoint: <span class="message-ok">' + doc.sequence + '</span>';
                SmartphoneSimController.message(message);

                TimeWayController.scrollTo(doc._id);
                DataDisplayController.setData(doc);
                StatusDisplayController.setData(doc);
                aNicerWay.socketController.sendTimePointNr(doc.sequence);


                clearInterval(timerPoint);
            }
        }

        console.log('** Point -- : ' + counter);
    }


    /**
     *
     *
     */
    loadComponents() {

        this.consoleController = new ConsoleController();
        this.dataDisplayController = new DataDisplayController();
        this.smartphoneSimController = new SmartphoneSimController(this.simulator_size);
        this.statusDisplayController = new StatusDisplayController();
        this.navigationController = new NavigationController();
        this.timeWayController = new TimeWayController();
        this.remoteDisplayController = new RemoteDisplayController();
        this.dbController = new DbController();
        this.socketController = new SocketController();

    }


    /**
     * addEventsListeners
     *
     */
    addEventListeners() {

        //
        $('.navigation-button-next').click(aNicerWay.goToNext);

        //
        $('.navigation-button-previous').click(aNicerWay.goToPrevious);
    }

    /**
     * addKeystrokes
     */
    addKeystrokes() {

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


    }

    /**
     *
     *
     */
    loadTimeWayPointList() {
        console.log('loadTimeWayPoints');

        this.timeWayPoint_ListDocs = false;
        this.timeWayPoint_First_ID = false;
        this.timeWayPoint_Last_ID = false;

        this.db.allDocs({
            include_docs: true,
            startkey: 'TimeWayPoint',
            endkey: 'TimeWayPoint\uffff'
        }).then(function (docs: any) {

            // Wenn keine Timepoints vorhanden, standart einlesen:
            if (docs.rows.length === 0) {

                // Zeige Modal mit DB abfrage
                $('#modal-Init-DB').modal('show');

            }
            else {

                let unorderd_list = docs.rows;

                // sort
                let list_docs: any = [];
                let list_sequence: any = [];

                $.each(unorderd_list, function (index, row) {
                    let number: number = row.doc.sequence;
                    list_docs[number] = row.doc;
                    list_sequence[number] = row.doc._id;
                });

                console.log(list_docs);
                console.log(list_sequence);

                let count: number = list_docs.length - 1;
                let firstID = list_docs[1]._id;
                let lastID = list_docs[count]._id;  // Arrays beginnen bei NULL, alse einen abziehen


                console.log('firstID: ' + firstID);
                console.log('lastID' + lastID);

                aNicerWay.timeWayPoint_First_ID = firstID;
                aNicerWay.timeWayPoint_Last_ID = lastID;

                aNicerWay.timeWayPoint_ListDocs = list_docs;
                aNicerWay.timeWayPoint_ListSequence = list_sequence;
            }


            return docs;

        }).catch(function (err: any) {
            console.log(err);
        });

    }


    /**
     *
     * @param id
     */
    loadTimeWayPointFromDB(id?: string) {
        console.log('loadTimeWayPoint' + '- id: ');
        // console.log(id);

        this.timeWayPoint_Now_Doc = false;
        this.timeWayPoint_Now_ID = false;

        if (!id) {
            id = this.getFirstTimeWayPoint();
        }

        this.db.get(id).catch(function (err: any) {
            if (err.name === 'not_found') {
                console.log('- not found');

                return {
                    // hier kann ein Standartdokument angegeben werden
                    // _id: 'default',

                };
            } else { // hm, some other error
                throw err;
            }
        }).then(function (doc: any) {

            aNicerWay.timeWayPoint_Now_Doc = doc;
            aNicerWay.timeWayPoint_Now_ID = doc._id;


        }).catch(function (err: any) {
            // handle any errors

            console.error(err);

        });

        // Auf das Dokument kann zugegriffen werden über:
        //    .then( function(doc){ doc })

    }

    loadTimeWayPoint(id?: string) {
        //   console.log('loadTimeWayPoint' + '- id: ' + id);

        _update_loadTimeWayPoint_zaehler++;
        console.log('** Update Point : ' + _update_point_zaehler);

        const speed = 50;
        const trying = 20;
        let timerLoadPoint = setInterval(tryList, speed);
        let counter = 0;

        function tryList() {

            counter++;
            // Nach 20 Versuchen abbrechen
            if (counter >= trying) {
                clearInterval(timerLoadPoint);
            }


            // Liste
            let id_list: any = aNicerWay.timeWayPoint_ListSequence;

            if (id_list) {
                clearInterval(timerLoadPoint);

                let sequence_nr: number = 0;

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

                    for (let i: number = 0; i < id_list.length; i++) {

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
                let doc = aNicerWay.timeWayPoint_ListDocs[sequence_nr];
                aNicerWay.timeWayPoint_Now_Doc = doc;
                return doc;

            } // Trylist
        }

        console.log('** timerLoadPoint -- : ' + counter);

    }


// GET
    getTimeWayPointList() {
        return this.timeWayPoint_ListDocs;
    }

    getTimeWayPoint() {
        return this.timeWayPoint_Now_Doc;
    }


    getLastTimeWayPoint() {
        return this.timeWayPoint_Last_ID;
    }


    getFirstTimeWayPoint() {
        return this.timeWayPoint_First_ID;
    }

    getNextTimeWayPoint() {
        return this.timeWayPoint_Next_ID;
    }

    getPrevioussTimeWayPoint() {
        return this.timeWayPoint_Previous_ID;
    }

    // Set
    setTimeWayPointList() {
        this.loadTimeWayPointList();
        this.updateList();
    }

    setTimeWayPoint(id: any) {
        this.loadTimeWayPoint(id);
        this.updatePoint();
    }


    setLastTimeWayPoint(id: string) {
    }


    setFirstTimeWayPoint(id: string) {
    }

    setNextTimeWayPoint(id: string) {

    }

    setPrevioussTimeWayPoint(id: string) {

    }

    // goTo
    goTo(id?: string) {
        aNicerWay.setTimeWayPoint(id);
    }

    goToLast() {
        let id = aNicerWay.timeWayPoint_Last_ID;
        aNicerWay.setTimeWayPoint(id);
    }

    goToFirst() {
        let id = aNicerWay.timeWayPoint_First_ID;
        aNicerWay.setTimeWayPoint(id);
    }

    goToNext() {
        let id = aNicerWay.timeWayPoint_Next_ID;
        aNicerWay.setTimeWayPoint(id);
    }

    goToPrevious() {
        let id = aNicerWay.timeWayPoint_Previous_ID;
        aNicerWay.setTimeWayPoint(id);
    }

// Version
    setVersion() {
        $('.version').text(this.version);
        return this.version;
    }

    static openModalCenter() {
        console.log('openModalCenter');
        $('#remote-modal-how-open').hide();
        $('#remote-modal-change-directly').hide();
        $('#init-DB-message-wrapper').hide();

        // Modal öffnen
        $('#modal-center').modal('show');
    }

    static closeModalCenter() {
        console.log('closeModalCenter');
        $('#remote-modal-how-open').hide();
        $('#remote-modal-change-directly').hide();
        $('#init-DB-message-wrapper').hide();

        // Modal öffnen
        $('#modal-center').modal('hide');

    }


    detectMobile() {
        if (this.check_for_mobile === true) {

            $(document).ready(function () {
                let isMobile = window.matchMedia("only screen and (max-width: 760px)");

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

                        let countdown = [3, 2, 1, 0];

                        const speed = 1000;
                        let timer = setInterval(lineAfterLine, speed);
                        let length = countdown.length;
                        let index = 0;

                        function lineAfterLine() {
                            let counter = countdown[index];

                            $('.go-remote-contdown-number').text(counter);

                            index++;

                            // remove timer after interating through all articles
                            if (index >= length) {
                                clearInterval(timer);
                                let pikto = '<span class="glyphicon glyphicon-sort "></span>';
                                $('.go-remote-contdown-number').html(pikto);

                                // Modal nach 4 sekunden beenden
                                $('#modal-center').modal('hide');

                            }
                        }

                    })

                }  // isMobile
            }); // ready

            return true;

        } else {

            return false;
        }
    }


} // Class


