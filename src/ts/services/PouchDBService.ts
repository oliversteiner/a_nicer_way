/**
 * Class DbController
 *  - Sammelt alle Funktionen für die Speicherung der Daten
 *
 *
 */


// Global

class PouchDBService {

    remote: any;

    // Wird aufgerufen beim erstellen der Klasse (new pouchDBService)
    constructor() {

        this.remote = 'http://localhost:5984/anicerway';


    }

    /**
     * addWayPoint
     * - Einen TimeWayPoint in die Datenbank schreiben
     *
     * @param data
     */
    static addWayPoint(data: any) {

        // Rückgabewert ist als Falsch voreingestellt
        let status: boolean = false;
        let db = new PouchDB('anicerway');
        let timeWayPoint: any;

        // Datensatz zusammenstellen

        timeWayPoint = {
            _id: 'TimeWayPoint-' + new Date().toISOString(),
            active: true,
        };

        // alle Werte von "data" in  "doc" fügen.
        for (let key in data) {
            if (data.hasOwnProperty(key)) {

                let value = data[key];
                if (key != "_id") {   // _id herausfiltern

                    timeWayPoint[key] = value;
                }
            }
        }

        // Datensatz in die DB speichern
        db.put(timeWayPoint).then(function (response: any) {
            // handle response

            setTimeout(function () {
                pouchDBService.sync();
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

            for (let key in data) {
                if (data.hasOwnProperty(key)) {

                    let value = data[key];
                    if (key != "_id") {   // _id herausfiltern

                        doc[key] = value;
                    }
                }
            }

            pouchDBService.sync();

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

        let db = new PouchDB('anicerway');

        let docs = db.allDocs({
            include_docs: true,
            startkey: 'TimeWayPoint',
            endkey: 'TimeWayPoint\uffff'
        }).then(function (result) {

            // sort


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
     *  - lädt nur den TimeWayPoint mit der gewählten ID
     *
     * @param id
     */
    static loadWayPoint(id: string) {

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
     * - Löscht einen TimeWayPoint aus der DB
     *
     * @param id
     *
     */
    static deleteWayPoint(id: string): boolean {


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


            doc._deleted = true;

            pouchDBService.sync();

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
    sync() {

        let sync_options = {
            live: true,
            retry: true,
            continuonus: true
        };

        let db = new PouchDB('anicerway');
        db.sync(this.remote, sync_options);
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
            alert('Alle Einträge gelöscht');
            window.location.replace(window.location.pathname + window.location.search + window.location.hash);


        }).catch(function (error: object) {
            // error occurred
        });
    }


    static  loadDefault() {
        let data: any;
        let status:any = {};

        let path_json = "./data/defaultdata.json";

        let jqxhr = $.getJSON(path_json, function (json) {
            console.log("success");

            data = json.data;
            PouchDBService.loadDataToDB(data);
        })
            .done(function () {

            })
            .fail(function (err) {
                console.warn("error from JSON File");
                console.log(err);
                status = {
                    status: "err",
                    message: "JSON FILE not Found",
                    error: err
                }
            })
            .always(function () {
                console.log("complete");
            });

        return status;


    }

    static loadDataToDB(data: any) {
        console.log('neue DB Einträge');


        // Musterdaten:
        let db = new PouchDB('anicerway');

        // Aktuelle Zeit
        let timestamp = Date.now();


        // Vorgaben für die Daten

        db.bulkDocs(data).then(function (result: object) {
            // handle result

            console.log("mustereintraege");
            console.log(result);

        }).catch(function (error: object) {

            console.log(error);


            console.log("defaultData exists already");
        });


        // define _design Configuration
        let designDocConfiguration: any = {
            _id: '_design/Configuration',
            views: {
                "Configuration": {
                    "map": "function (doc, meta) {  if (doc.type == 'Configuration') {   emit(doc.createdOn,doc);  }}"
                }
            }
        };

        // define _design TimeWayPoint
        let designDocTimeWayPoint: any = {
            _id: '_design/TimeWayPoint',
            views: {
                "TimeWayPoint": {
                    "map": "function (doc, meta) {  if (doc.type == 'TimeWayPoint') {   emit(doc.createdOn,doc);  }}"
                }
            }
        };


        // put _designs
        // kunde
        db.put(designDocConfiguration).then(function (info: any) {
            console.log("Design Doc 'Configuration' created");
            // design doc created
        }).catch(function (error: any) {
            console.log("design doc 'Configuration' already exists");
            // if err.name === 'conflict', then
            // design doc already exists
        });

        // TimeWayPoint
        db.put(designDocTimeWayPoint).then(function (info: any) {
            console.log("Design Doc 'TimeWayPoint' created");
            // design doc created
        }).catch(function (error: any) {
            console.log("design doc 'TimeWayPoint' already exists");
            // if err.name === 'conflict', then
            // design doc already exists
        });

    }

}