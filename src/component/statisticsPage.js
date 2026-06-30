import { $ } from 'jquery';
import { component } from '../class/component';
import { statisticsManager } from '../class/statisticsManager';
import htmlContent from './statisticsPage.html?raw';

export class statisticsPage extends component
{
    constructor(activities) {
        console.log(activities);
        super();
        this.defaultFields = ['Cadence', 'Distance', 'Duration', 'Heart', 'Speed', 'Steps'];
        this.statMgr = new statisticsManager(activities);
    }
    initChart() {
        let filters =  [0, 50000, 5];
        this.statMgr.buildChart('divStatsContainer', filters, this.defaultFields);
    }
    applyFiltersToChart() {
        // Get filters
        let filters =  [];
        filters.push($('#txtMinDistance').val()*1);
        filters.push($('#txtMaxDistance').val()*1);
        filters.push($('#txtMaxActivities').val()*1);        

        // Get Fields
        let fields = [];
        let options = $('#selFields option');
        if (options.length>0) {
            options.each((i,opt) => {
                if (opt.selected) fields.push(opt.text);
            });
        }
        if (fields.length==0) fields = this.defaultFields;

        // Rebuild chart
        this.statMgr.destroyChart();
        this.statMgr.buildChart('divStatsContainer', filters, fields);
    }
    changeSelectDistance() {
        let value = event.currentTarget.value;
        let arrayValues = value.split('-');
        $('#txtMinDistance').val(arrayValues[0]);
        $('#txtMaxDistance').val(arrayValues[1]);
    }
    buildFields() {
        let html = "";
        this.defaultFields.forEach((field) => {
            html += "<option selected>" + field + "</option>";
        });
        $('#selFields').html(html);
    }
    build(containerId) {
        let res = $.Deferred();
        this.loadContent(containerId, htmlContent).done(() => {
            this.buildFields();
            this.initChart();
            $('#btnFilter').click(() => {
                this.applyFiltersToChart();
            });
            $('#selDistanceRange').change(() => {
                this.changeSelectDistance();
            });
            res.resolve();
        }).fail(() => {
            res.reject();
        });
        return res.promise();
    }
}