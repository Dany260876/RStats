import { $ } from 'jquery';
import listActivitiesHtml from './listActivities.html?raw';

export class listActivities 
{
    constructor(activities) {
        this.activities = activities;
    }
    build() {
        let res = $.Deferred();
        try {
            $("#app").html(listActivitiesHtml);
            $("#tblActivities").html(this.getActivities());
            res.resolve();    
        }
        catch(err) {
            console.log(err);
            res.reject();                
        }
        return res.promise();
    }
    getActivities() {
        let html = "";
        html += "<tr class='header'><td>Activity Type</td><td>Date & Time</td><td>Name</td><td>Distance</td><td>Duration</td></tr>";
        this.activities.forEach((act) => {
            html += "<tr>";
            html += "<td>" + act.activityType.typeKey + "</td>";
            html += "<td>" + act.startTimeLocal + "</td>";
            html += "<td>" + act.activityName + "</td>";
            html += "<td>" + (act.distance/1000).toFixed(2) + "</td>";
            let sec = Math.floor(act.duration)%60;
            html += "<td>" + ((Math.floor(act.duration)-sec)/60) + "." + sec + "</td>";
            html += "</tr>";
        });
        return html;
    }
}