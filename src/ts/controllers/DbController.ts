/**
 * Created by ost on 07.06.17.
 */
class DbController {

    data: any;
    db: any;
    remote: any;

    constructor() {

        this.db = new PouchDB('anicerway');
        this.remote = 'http://localhost:5984/anicerway';
        let options = {
            live: true,
            retry: true,
            continuonus: true
        };

        this.db.sync(this.remote, options);

    }


    addWayPoint(data: any) {
        let waypoint = {
            _id: 'waypoint-' + new Date().toISOString(),

            timewayid: data.timewayid,
            date: data.date,
            place: data.place,
            feeling: data.feeling,
            message: data.message,
            notice: data.notice,
            active: true,

        };
        this.db.put(waypoint, function callback(err: string, result: any) {
            if (!err) {
                console.log('Successfully posted a waypoint!');
            }
        });
    }

    /**
     *
     *
     */
    // Show items from the database
    loadAllWayPoints() {
        this.db.allDocs({include_docs: true, descending: true},
            function (err: string, doc: any) {
                return (doc.row);
            });

    }

    /**
     *
     *
     * @param id
     */
    loadWayPoint(id: string) {


        this.db.get(id).then(function (doc: any) {
            return (doc);
        });
    }


    /**
     *   UNGETESTET
     *
     *
     */
    updateWayPoint(data: any) {
        this.db.get(data._id).then(function (doc: any) {

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
            .then(function (doc: object) {

                console.log(doc);
            });
    }

    /**
     *  Untested
     * deleteWayPoint
     *
     */
    deleteWayPoint(data: any) {


        this.db.get(data._id)
            .then(function (doc: any) {
                return this.db.remove(doc._id, doc._rev)
                    .catch(function (err: any) {
                        // error!
                        console.log(err)
                    });
            });
        return true; // Todo
    }
}