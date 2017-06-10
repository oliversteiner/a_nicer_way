/**
 * Class DbController
 *  - Sammelt alle Funktionen für die Speicherung der Daten
 *
 *
 */
class DbController {

    remote: any;    // die DB unter localhost / mollo.ch
    waypoint: object;  // ein einzelner Waypoint (Eintrag zu einem Punkt in der Zeit/Wegleiste)
    waypoints: object; // die Liste aller Waypoints

    // Wird aufgerufen beim erstellen der Klasse (new DbController)
    constructor() {
        console.log('DbController.constructor');


        let db = new PouchDB('anicerway');

        // wird immer ausgeführt, wenn änderugen an der Datenbank erfolgt sind
        db.changes().on('change', function () {
            // console
            console.log('db Changes');

        });


    }

    /**
     * addWayPoint
     * - Einen Waypoint in die Datenbank schreiben
     *
     * @param data
     */
    static addWayPoint(data: any) {
        console.log('DbController.addWayPoint' + ' - data');
        console.log(data);

        // Rückgabewert ist als Falsch voreingestellt
        let status: boolean = false;
        let db = new PouchDB('anicerway');
        let waypoint: any;

        // Datensatz zusammenstellen

        waypoint = {
            _id: 'TimeWayPoint-' + new Date().toISOString(),
            active: true,
        };

        // alle Werte von "data" in  "doc" fügen.
        console.log('- Data (add)');
        for (let key in data) {
            if (data.hasOwnProperty(key)) {

                let value = data[key];
                if (key != "_id") {   // _id herausfiltern

                    console.log("--- " + key + " : " + value);
                    waypoint[key] = value;
                }
            }
        }

        // Datensatz in die DB speichern
        db.put(waypoint).then(function (response: any) {
            // handle response
            console.log(response);

            setTimeout(function () {
                DbController.sync();
            }, 1000);

        }).catch(function (err) {

            console.error(err);
        });

        return status;

    }

    /**
     *
     * updateWayPoint
     *  - ändert einen Eintrag in der DB
     *
     * @param data
     *
     */
    static updateWayPoint(data: any) {
        console.log('DbController.updateWayPoint' + '- data: ');
        console.log(data);
        let status = false;

        let db = new PouchDB('anicerway');

        // Dokument laden, dann updaten
        db.get(data._id).catch(function (err) {
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

            console.log('- found:');
            console.log(doc);

            for (let key in data) {
                if (data.hasOwnProperty(key)) {

                    let value = data[key];
                    if (key != "_id") {   // _id herausfiltern

                        console.log("--- " + key + " : " + value);
                        doc[key] = value;
                    }
                }
            }

            DbController.sync();

            return db.put(doc);

        }).catch(function (err) {
            // handle any errors
            console.error(err);

        });

        return status;
    }

    /**
     * loadAllWayPoints
     *  - holt alle Waypoints aus der Datenbank
     *
     *
     */
    static loadAllWayPoints() {
        console.log('DbController.loadAllWayPoints');

        let db = new PouchDB('anicerway');

        let docs = db.allDocs({
            include_docs: true,
            startkey: 'TimeWayPoint',
            endkey: 'TimeWayPoint\uffff'
        }).then(function (result) {

            console.log(result);
            return result;
            // handle result
        }).catch(function (err) {
            console.log(err);
        });

        // Auf die Zeilen kann zugegriffen werden über:
        //    .then( function(doc){ doc.rows })
        return docs;
    }




    /**
     * loadWayPoint
     *  - lädt nur den Waypoint mit der gewählten ID
     *
     * @param id
     */
    static loadWayPoint(id: string) {
        console.log('DbController.loadWayPoint' + '- id: ');
        console.log(id);
        let db = new PouchDB('anicerway');

        let doc = db.get(id).catch(function (err) {
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

            console.log('- found:');
            console.log(doc);

            return doc;

        }).catch(function (err) {
            // handle any errors
            console.error(err);

        });

        // Auf das Dokument kann zugegriffen werden über:
        //    .then( function(doc){ doc })
        return doc;
    }

    /**
     * deleteWayPoint
     * - Löscht einen Waypoint aus der DB
     *
     * @param id
     *
     */
    static deleteWayPoint(id: string): boolean {
        console.log('DbController.deleteWayPoint' + ' - id');
        console.log(id);

        let status: boolean = true;
        let db = new PouchDB('anicerway');

        // Dokument laden, dann den Löschbefehl schicken
        db.get(id).catch(function (err) {
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

            console.log('- found:');
            console.log(doc);

            doc._deleted = true;

            DbController.sync();

            return db.put(doc);


        }).catch(function (err) {
            // handle any errors
            console.error(err);

        });

        return status;
    }

    /**
     * sync
     *  - synchronisiert die lokale DB im Browser mit der BS-datenbank (couchDB)
     */
    static sync() {

        let remote = 'http://localhost:5984/anicerway';
        let sync_options = {
            live: true,
            retry: true,
            continuonus: true
        };

        let db = new PouchDB('anicerway');
        db.sync(remote, sync_options);
    }

    /**
     *
     *
     */
    static eraseDB() {

        let db = new PouchDB('anicerway');

        db.destroy().then(function () {
            // database destroyed
            console.log('database destroyed');

        }).catch(function (error: object) {
            // error occurred
        })
    }

    static loadDefault(){


        // Musterdaten:
        let db = new PouchDB('anicerway');

        // Aktuelle Zeit
        let timestamp = Date.now();

        // Vorgaben für die Daten
        let defaultData: any = [

            // Config
            {
                _id: 'config',
                title: 'Konfiguration',
                notiz: 'Eine einfache Notiz',
                profilePic: 'assets/img/kunden/eagle.jpg',
                type: 'Configuration',
                createdOn: timestamp,

            },
            // TimeWayPoint
            {
                _id: 'TimeWayPoint-1',
                timewayid: 1,
                date: '2017.10.08',
                time: '00:00',
                place: 'Olten - Stadt',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            }
            ,
            {
                _id: 'TimeWayPoint-2',
                timewayid: 2,
                date: '2017.10.08',
                time: '00:00',
                place: 'Olten - Bahnhof',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            }
            ,
            {
                _id: 'TimeWayPoint-3',
                timewayid: 3,
                date: '2017.10.08',
                time: '00:00',
                place: 'St.Gallen - Bahnhof',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-4',
                timewayid: 4,
                date: '2017.10.08',
                time: '00:00',
                place: 'St.Gallen - Bushaltestelle',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                figur: 'bus',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            }
            ,
            {
                _id: 'TimeWayPoint-5',
                timewayid: 5,
                date: '2017.10.08',
                time: '00:00',
                place: 'Riethüsli - Bushaltestelle',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-6',
                timewayid: 6,
                date: '2017.10.08',
                time: '00:00',
                place: 'Riethüsli - Schulhaus',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-7',
                timewayid: 7,
                date: '2017.10.08',
                time: '00:00',
                place: 'Riethüsli - Schulhaus',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-8',
                timewayid: 8,
                date: '2017.10.08',
                time: '00:00',
                place: 'Riethüsli - Schulhaus',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-9',
                timewayid: 9,
                date: '2017.10.08',
                time: '00:00',
                place: 'Riethüsli - Schulhaus',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-10',
                timewayid: 10,
                date: '2017.10.08',
                time: '00:00',
                place: 'Riethüsli - Schulhaus',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            }



        ];


        db.bulkDocs(defaultData).then(function ( result: object ) {
            // handle result

            //  console.log("mustereintraege");
            //  console.log(result);

        }).catch(function ( error: object ) {
            console.log("defaultData exists already");
        });



            // define _design Configuration
        let designDocConfiguration:any = {
                _id: '_design/Configuration',
                views: {
                    "Configuration": {
                        "map": "function (doc, meta) {  if (doc.type == 'Configuration') {   emit(doc.createdOn,doc);  }}"
                    }
                }
            };

        // define _design TimeWayPoint
        let designDocTimeWayPoint:any = {
            _id: '_design/TimeWayPoint',
            views: {
                "TimeWayPoint": {
                    "map": "function (doc, meta) {  if (doc.type == 'TimeWayPoint') {   emit(doc.createdOn,doc);  }}"
                }
            }
        };


        // put _designs
        // kunde
        db.put(designDocConfiguration).then(function ( info: any ) {
            console.log("Design Doc 'Configuration' created");
            // design doc created
        }).catch(function ( error: any ) {
            console.log("design doc 'Configuration' already exists");
            // if err.name === 'conflict', then
            // design doc already exists
        });

        // TimeWayPoint
        db.put(designDocTimeWayPoint).then(function ( info: any ) {
            console.log("Design Doc 'TimeWayPoint' created");
            // design doc created
        }).catch(function ( error: any ) {
            console.log("design doc 'TimeWayPoint' already exists");
            // if err.name === 'conflict', then
            // design doc already exists
        });


    }

}