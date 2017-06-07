/**
 * Created by ost on 07.06.17.
 */
var DbController = (function () {
    function DbController() {
        this.db = new PouchDB('anicerway');
        this.remote = 'http://localhost:5984/anicerway';
        var options = {
            live: true,
            retry: true,
            continuonus: true
        };
        this.db.sync(this.remote, options);
    }
    DbController.prototype.addWayPoint = function (data) {
        var waypoint = {
            _id: 'waypoint-' + new Date().toISOString(),
            timewayid: data.timewayid,
            date: data.date,
            place: data.place,
            feeling: data.feeling,
            message: data.message,
            notice: data.notice,
            active: true,
        };
        this.db.put(waypoint, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a waypoint!');
            }
        });
    };
    /**
     *
     *
     */
    // Show items from the database
    DbController.prototype.loadAllWayPoints = function () {
        this.db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
            return (doc.row);
        });
    };
    /**
     *
     *
     * @param id
     */
    DbController.prototype.loadWayPoint = function (id) {
        this.db.get(id).then(function (doc) {
            return (doc);
        });
    };
    /**
     *   UNGETESTET
     *
     *
     */
    DbController.prototype.updateWayPoint = function (data) {
        this.db.get(data._id).then(function (doc) {
            // update their age
            doc.timewayid = data.timewayid;
            doc.date = data.date;
            doc.place = data.place;
            doc.feeling = data.feeling;
            doc.message = data.message;
            doc.notice = data.notice;
            // put them back
            return this.db.put(doc);
        })
            .then(function () {
            // fetch mittens again
            return this.db.get(data._id);
        })
            .then(function (doc) {
            console.log(doc);
        });
    };
    /**
     *  Untested
     * deleteWayPoint
     *
     */
    DbController.prototype.deleteWayPoint = function (data) {
        this.db.get(data._id)
            .then(function (doc) {
            return this.db.remove(doc._id, doc._rev)
                .catch(function (err) {
                // error!
                console.log(err);
            });
        });
        return true; // Todo
    };
    return DbController;
}());
