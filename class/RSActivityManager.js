export default class RSActivitytManager {
    constructor() {
        this.activities = [];
    }
    add(newActivity) {       
        this.activities.push(newActivity);
    }
    update(id, activity) {
        this.activities.forEach((act, i) => {
            if (act.id == id) {
                this.activities[i] = activity;
                return;
            }
        });
    }
    get() {
        return this.activities();
    }
    get(idActivity) {
        let result = null;
        this.activities.forEach((act, i) => {
            if (act.id == idActivity) {
                result = act;
            }
        });
        return result;
    }
    save() {
        let res = $.Deferred();
        localforage.setItem('RSActivities', this.activities)
            .then(() => {
                res.resolve(this.activities);
            })
            .catch((err) => {
                res.reject();
                console.log(err);
            });
        return res;
    }
    load() {
        let res = $.Deferred();
        var me = this; 
        this.activities = [];
        localforage.getItem('RSActivities').then((items) => {
            if (items!=null) {
                me.activities = items;
                me.sortByDate();
                res.resolve(me.activities);
            }
            else {
                res.resolve([]);
            }
        }).catch(function(err) {
            console.log(err);
            res.reject();
        });
        return res;
    }
    remove(idActivity) {
        this.activities.forEach((act, i) => {
            if (act.id == idActivity) {
                this.activities.splice(i,1);
                return;
            }
        });
        return this.activities;
    }
    sortByDate() {
        this.activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
}
