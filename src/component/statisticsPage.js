import { $ } from 'jquery';
import { component } from '../class/component';
import { statisticsManager } from '../class/statisticsManager';
import htmlContent from './statisticsPage.html?raw';

export class statisticsPage extends component
{
    constructor(activities) {
        super();
        this.statMgr = new statisticsManager(activities);
    }
    buildChart() {
        let fields = ['Distance', 'Speed', 'Cadence', 'Heart', 'Duration'];
        let filters =  [0, 10000, 5];
        this.statMgr.buildChart('divStatsContainer', filters, fields);
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
        if (fields.length==0) fields = ['Distance', 'Speed', 'Cadence', 'Heart', 'Duration'];

        // Rebuild chart
        this.statMgr.destroyChart();
        this.statMgr.buildChart('divStatsContainer', filters, fields);
    }
    buildFields() {
        let fields = ['Distance', 'Speed', 'Cadence', 'Heart', 'Duration'];
        let html = "";
        fields.forEach((field) => {
            html += "<option>" + field + "</option>";
        });
        $('#selFields').html(html);
    }
    build(containerId) {
        let res = $.Deferred();
        this.loadContent(containerId, htmlContent).done(() => {
            this.buildFields();
            this.buildChart();
            $('#btnFilter').click(() => {
                this.applyFiltersToChart();
            });
            res.resolve();
        }).fail(() => {
            res.reject();
        });
        return res.promise();
    }
}