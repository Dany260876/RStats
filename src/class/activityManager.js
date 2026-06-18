import { $ } from 'jquery';
import { activity } from './activity';

export class activityManager {
    constructor() {}
    getActivities() {
        let res = $.Deferred();
        $.getJSON('activities.json').done((data) => {
            let activities = [];
            data.forEach((act) => {
                activities.push(new activity(act));
            });
            res.resolve(activities);
        }).fail((err) => {
            res.reject();
            console.log(err);
        });
        return res.promise();
    }
}