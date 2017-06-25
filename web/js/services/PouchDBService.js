/**
 * Class DbController
 *  - Sammelt alle Funktionen für die Speicherung der Daten
 *
 *
 */
// Global
var PouchDBService = (function () {
    // Wird aufgerufen beim erstellen der Klasse (new pouchDBService)
    function PouchDBService() {
        this.remote = 'http://localhost:5984/anicerway';
    }
    /**
     * addWayPoint
     * - Einen TimeWayPoint in die Datenbank schreiben
     *
     * @param data
     */
    PouchDBService.addWayPoint = function (data) {
        // Rückgabewert ist als Falsch voreingestellt
        var status = false;
        var db = new PouchDB('anicerway');
        var timeWayPoint;
        // Datensatz zusammenstellen
        timeWayPoint = {
            _id: 'TimeWayPoint-' + new Date().toISOString(),
            active: true,
        };
        // alle Werte von "data" in  "doc" fügen.
        for (var key_1 in data) {
            if (data.hasOwnProperty(key_1)) {
                var value = data[key_1];
                if (key_1 != "_id") {
                    timeWayPoint[key_1] = value;
                }
            }
        }
        // Datensatz in die DB speichern
        db.put(timeWayPoint).then(function (response) {
            // handle response
            setTimeout(function () {
                pouchDBService.sync();
            }, 1000);
        }).catch(function (err) {
            console.error(err);
        });
        return status;
    };
    /**
     *
     * updateWayPoint
     *  - ändert einen Eintrag in der DB
     *
     * @param data
     *
     */
    PouchDBService.updateWayPoint = function (data) {
        var status = false;
        var db = new PouchDB('anicerway');
        // Dokument laden, dann updaten
        db.get(data._id).catch(function (err) {
            if (err.name === 'not_found') {
                console.log('- not found');
                return {};
            }
            else {
                throw err;
            }
        }).then(function (doc) {
            for (var key_2 in data) {
                if (data.hasOwnProperty(key_2)) {
                    var value = data[key_2];
                    if (key_2 != "_id") {
                        doc[key_2] = value;
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
    };
    /**
     * loadAllWayPoints
     *  - holt alle Waypoints aus der Datenbank
     *
     *
     */
    PouchDBService.loadAllWayPoints = function () {
        var db = new PouchDB('anicerway');
        var docs = db.allDocs({
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
    };
    /**
     * loadWayPoint
     *  - lädt nur den TimeWayPoint mit der gewählten ID
     *
     * @param id
     */
    PouchDBService.loadWayPoint = function (id) {
        var db = new PouchDB('anicerway');
        var doc = db.get(id).catch(function (err) {
            if (err.name === 'not_found') {
                console.log('- not found');
                return {};
            }
            else {
                throw err;
            }
        }).then(function (doc) {
            return doc;
        }).catch(function (err) {
            // handle any errors
            console.error(err);
        });
        // Auf das Dokument kann zugegriffen werden über:
        //    .then( function(doc){ doc })
        return doc;
    };
    /**
     * deleteWayPoint
     * - Löscht einen TimeWayPoint aus der DB
     *
     * @param id
     *
     */
    PouchDBService.deleteWayPoint = function (id) {
        var status = true;
        var db = new PouchDB('anicerway');
        // Dokument laden, dann den Löschbefehl schicken
        db.get(id).catch(function (err) {
            if (err.name === 'not_found') {
                console.log('- not found');
                return {};
            }
            else {
                throw err;
            }
        }).then(function (doc) {
            doc._deleted = true;
            pouchDBService.sync();
            return db.put(doc);
        }).catch(function (err) {
            // handle any errors
            console.error(err);
        });
        return status;
    };
    /**
     * sync
     *  - synchronisiert die lokale DB im Browser mit der BS-datenbank (couchDB)
     */
    PouchDBService.prototype.sync = function () {
        var sync_options = {
            live: true,
            retry: true,
            continuonus: true
        };
        var db = new PouchDB('anicerway');
        db.sync(this.remote, sync_options);
    };
    /**
     *
     *
     */
    PouchDBService.eraseDB = function () {
        var db = new PouchDB('anicerway');
        db.destroy().then(function () {
            // database destroyed
            console.log('database destroyed');
            alert('Alle Einträge gelöscht');
            window.location.replace(window.location.pathname + window.location.search + window.location.hash);
        }).catch(function (error) {
            // error occurred
        });
    };
    PouchDBService.loadDefault = function () {
        var data;
        var status = {};
        var path_json = "./data/defaultdata.json";
        var jqxhr = $.getJSON(path_json, function (json) {
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
            };
        })
            .always(function () {
            console.log("complete");
        });
        return status;
    };
    PouchDBService.loadDataToDB = function (data) {
        console.log('neue DB Einträge');
        // Musterdaten:
        var db = new PouchDB('anicerway');
        // Aktuelle Zeit
        var timestamp = Date.now();
        // Vorgaben für die Daten
        db.bulkDocs(data).then(function (result) {
            // handle result
            console.log("mustereintraege");
            console.log(result);
        }).catch(function (error) {
            console.log(error);
            console.log("defaultData exists already");
        });
        // define _design Configuration
        var designDocConfiguration = {
            _id: '_design/Configuration',
            views: {
                "Configuration": {
                    "map": "function (doc, meta) {  if (doc.type == 'Configuration') {   emit(doc.createdOn,doc);  }}"
                }
            }
        };
        // define _design TimeWayPoint
        var designDocTimeWayPoint = {
            _id: '_design/TimeWayPoint',
            views: {
                "TimeWayPoint": {
                    "map": "function (doc, meta) {  if (doc.type == 'TimeWayPoint') {   emit(doc.createdOn,doc);  }}"
                }
            }
        };
        // put _designs
        // kunde
        db.put(designDocConfiguration).then(function (info) {
            console.log("Design Doc 'Configuration' created");
            // design doc created
        }).catch(function (error) {
            console.log("design doc 'Configuration' already exists");
            // if err.name === 'conflict', then
            // design doc already exists
        });
        // TimeWayPoint
        db.put(designDocTimeWayPoint).then(function (info) {
            console.log("Design Doc 'TimeWayPoint' created");
            // design doc created
        }).catch(function (error) {
            console.log("design doc 'TimeWayPoint' already exists");
            // if err.name === 'conflict', then
            // design doc already exists
        });
    };
    return PouchDBService;
}());
