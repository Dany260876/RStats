import { $ } from 'jquery';
import htmlContent from './activitiesPage.html?raw';
import { statsTools } from '../class/statsTools';

export class activitiesPage 
{
    constructor(activities) {
        this.activities = activities;
        this.statsTools = new statsTools();
    }
    build(containerId) {
        let res = $.Deferred();
        try {
            let html = $("#" + containerId).html();
            $("#" + containerId).html(html + htmlContent);
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
        html += "<tr class='header'>";
        html += "<td>Activity Type</td>"
        html += "<td>Name</td>";
        html += "<td>Date & Time</td>"
        html += "<td>Distance (km)</td>";
        html += "<td>Duration (m)</td>";
        html += "<td>Avg. Speed (km/h)</td>";
        html += "<td>Avg. Cadence (ppm)</td>";
        html += "<td>Avg. HR (bpm)</td>";
        html += "<td>Avg. steps (m)</td>";
        html += "</tr>";
        this.activities.forEach((act) => {
            console.log(act);
            html += "<tr>";
            html += "<td>" + act.activityType.typeKey + "</td>";
            html += "<td>" + act.activityName + "</td>";
            html += "<td>" + act.startTimeLocal + "</td>";
            html += "<td class='tdNumericValue'>" + (act.distance/1000).toFixed(2) + "</td>";
            html += "<td class='tdNumericValue'>" + this.statsTools.getFormattedDuration(act.duration) + "</td>";
            html += "<td class='tdNumericValue'>" + this.statsTools.getSpeedKph(act.averageSpeed).toFixed(2) + "</td>";
            html += "<td class='tdNumericValue'>" + (act.averageRunningCadenceInStepsPerMinute).toFixed(2) + "</td>";
            html += "<td class='tdNumericValue'>" + (act.averageHR) + "</td>";
            html += "<td class='tdNumericValue'>" + (act.avgStrideLength/100).toFixed(2) + "</td>";
            html += "</tr>";
        });
        return html;
    }
}