import { $ } from 'jquery';
import { statsTools } from '../class/statsTools';
import { component } from '../class/component';
import htmlContent from './activitiesPage.html?raw';

export class activitiesPage extends component
{
    constructor(activities) {
        console.log(activities);
        super();
        this.activities = activities;
    }
    build(containerId) {
        let res = $.Deferred();
        this.loadContent(containerId, htmlContent).done(() => {
            $("#tblActivities").html(this.getActivities());
            $('.tdShowDetails').click(() => {
                this.showActivityDetails($(event.srcElement).data('id'));
            });
            $('#btnCloseActivityDetails').click(() => {
                $('#tblActivities').show();
                $('#divActivityDetails').hide();
            });
            $('#previousActivity').click(() => {
                this.showActivityDetails($(event.srcElement).data('id'));
            });
            $('#nextActivity').click(() => {
                this.showActivityDetails($(event.srcElement).data('id'));
            });
            res.resolve();
        }).fail(() => {
            res.reject();
        });
        return res.promise();
    }
    showActivityDetails(activityId) {
        // get activity by id
        let index = this.activities.findIndex((act) => act.activityId == activityId);
        let activity = this.activities[index];

        // Get next & previous activity
        $('#previousActivity').hide();
        $('#nextActivity').hide();
        if (index>0) {
            let id = this.activities[index-1].activityId;
            $('#previousActivity').data('id',id);
            $('#previousActivity').show();
        }
        if (index<this.activities.length-1) {
            let id = this.activities[index+1].activityId;
            $('#nextActivity').data('id',id);
            $('#nextActivity').show();
        }

        // fill getOwnPropertyNames
        Object.getOwnPropertyNames(activity).forEach((prop)=>{
            let format = $('#' + prop).data('format');
            let value = activity[prop];
            $('#' + prop).text(statsTools.formatField(value, format));
        });
        
        // show details
        $('#tblActivities').hide();
        $('#divActivityDetails').show();
    }
    getActivities() {
        let html = "";
        html += "<tr class='header'>";
        html += "<td></td>";
        html += "<td>Activity Type</td>"
        html += "<td>Name</td>";
        html += "<td>Date & Time</td>"
        html += "<td>Distance (km)</td>";
        html += "<td>Duration (min)</td>";
        html += "<td>Avg. Speed (km/h)</td>";
        html += "<td>Avg. Cadence (ppm)</td>";
        html += "<td>Avg. HR (bpm)</td>";
        html += "<td>Avg. steps (cm)</td>";
        html += "<td>VO2Max (L/mn)</td>";
        html += "</tr>";
        this.activities.forEach((act) => {
            html += "<tr>";
            html += "<td class='tdShowDetails' data-id='" + act.activityId + "'>&#128196;</td>";
            html += "<td>" + act.activityType + "</td>";
            html += "<td>" + act.activityName + "</td>";
            html += "<td>" + act.startTimeLocal + "</td>";
            html += "<td class='tdNumericValue'>" + statsTools.getDistanceKm(act.distance).toFixed(2) + "</td>";
            html += "<td class='tdNumericValue'>" + statsTools.getFormattedDuration(act.duration) + "</td>";
            html += "<td class='tdNumericValue'>" + statsTools.getSpeedKph(act.averageSpeed).toFixed(2) + "</td>";
            html += "<td class='tdNumericValue'>" + (act.averageRunningCadenceInStepsPerMinute).toFixed(2) + "</td>";
            html += "<td class='tdNumericValue'>" + (act.averageHR) + "</td>";
            html += "<td class='tdNumericValue'>" + (act.avgStrideLength).toFixed(2) + "</td>";
            html += "<td class='tdNumericValue'>" + (act.vO2MaxValue!=undefined?act.vO2MaxValue:'-') + "</td>";
            html += "</tr>";
        });
        return html;
    }
}