/**
 * Class DbController
 *  - Sammelt alle Funktionen für die Speicherung der Daten
 *
 *
 */
var DbController = (function () {
    // Wird aufgerufen beim erstellen der Klasse (new DbController)
    function DbController() {
        console.log('DbController.constructor');
        var db = new PouchDB('anicerway');
        // wird immer ausgeführt, wenn änderugen an der Datenbank erfolgt sind
        db.changes().on('change', function () {
            // debug
            console.log('db Changes');
        });
    }
    /**
     * addWayPoint
     * - Einen Waypoint in die Datenbank schreiben
     *
     * @param data
     */
    DbController.addWayPoint = function (data) {
        console.log('DbController.addWayPoint' + ' - data');
        console.log(data);
        // Rückgabewert ist als Falsch voreingestellt
        var status = false;
        var db = new PouchDB('anicerway');
        var waypoint;
        // Datensatz zusammenstellen
        waypoint = {
            _id: 'TimeWayPoint-' + new Date().toISOString(),
            active: true,
        };
        // alle Werte von "data" in  "doc" fügen.
        console.log('- Data (add)');
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var value = data[key];
                if (key != "_id") {
                    console.log("--- " + key + " : " + value);
                    waypoint[key] = value;
                }
            }
        }
        // Datensatz in die DB speichern
        db.put(waypoint).then(function (response) {
            // handle response
            console.log(response);
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
        console.log('DbController.updateWayPoint' + '- data: ');
        console.log(data);
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
            console.log('- found:');
            console.log(doc);
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var value = data[key];
                    if (key != "_id") {
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
    };
    /**
     * loadAllWayPoints
     *  - holt alle Waypoints aus der Datenbank
     *
     *
     */
    DbController.loadAllWayPoints = function () {
        console.log('DbController.loadAllWayPoints');
        var db = new PouchDB('anicerway');
        var docs = db.allDocs({
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
    };
    /**
     * loadWayPoint
     *  - lädt nur den Waypoint mit der gewählten ID
     *
     * @param id
     */
    DbController.loadWayPoint = function (id) {
        console.log('DbController.loadWayPoint' + '- id: ');
        console.log(id);
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
    };
    /**
     * deleteWayPoint
     * - Löscht einen Waypoint aus der DB
     *
     * @param id
     *
     */
    DbController.deleteWayPoint = function (id) {
        console.log('DbController.deleteWayPoint' + ' - id');
        console.log(id);
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
        // Musterdaten:
        var db = new PouchDB('anicerway');
        // Aktuelle Zeit
        var timestamp = Date.now();
        // Vorgaben für die Daten
        var defaultData = [
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
                place: 'St.Gallen - Stadt',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-2',
                timewayid: 1,
                date: '2017.10.08',
                place: 'St.Gallen - Stadt',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-3',
                timewayid: 1,
                date: '2017.10.08',
                place: 'St.Gallen - Stadt',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            },
            {
                _id: 'TimeWayPoint-4',
                timewayid: 1,
                date: '2017.10.08',
                place: 'St.Gallen - Stadt',
                feeling: 'Gut',
                message: 'Nachricht 1',
                notice: '',
                type: 'TimeWayPoint',
                createdOn: timestamp,
            }
        ];
        db.bulkDocs(defaultData).then(function (result) {
            // handle result
            //  console.log("mustereintraege");
            //  console.log(result);
        }).catch(function (error) {
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
