/**
 * Class DbController
 *  - Sammelt alle Funktionen für die Speicherung der Daten
 *
 *
 */
// TODO ist ein Service, nicht Controller
// Global
var _jsonFile;
var DbController = (function () {
    // Wird aufgerufen beim erstellen der Klasse (new DbController)
    function DbController() {
        $.getJSON("data/defaultData.json", function (json) {
            _jsonFile = json;
        });
    }
    /**
     * addWayPoint
     * - Einen TimeWayPoint in die Datenbank schreiben
     *
     * @param data
     */
    DbController.addWayPoint = function (data) {
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
                DbController.sync();
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
    DbController.updateWayPoint = function (data) {
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
            DbController.sync();
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
    DbController.loadAllWayPoints = function () {
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
    DbController.loadWayPoint = function (id) {
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
    DbController.deleteWayPoint = function (id) {
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
            DbController.sync();
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
    DbController.sync = function () {
        var remote = 'http://localhost:5984/anicerway';
        var sync_options = {
            live: true,
            retry: true,
            continuonus: true
        };
        var db = new PouchDB('anicerway');
        db.sync(remote, sync_options);
    };
    /**
     *
     *
     */
    DbController.eraseDB = function () {
        var db = new PouchDB('anicerway');
        db.destroy().then(function () {
            // database destroyed
            console.log('database destroyed');
        }).catch(function (error) {
            // error occurred
        });
    };
    DbController.loadDefault = function () {
        console.log('neue DB Einträge');
        // Musterdaten:
        var db = new PouchDB('anicerway');
        // Aktuelle Zeit
        var timestamp = Date.now();
        // Vorgaben für die Daten
        db.bulkDocs(_jsonFile.data).then(function (result) {
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
    return DbController;
}());
