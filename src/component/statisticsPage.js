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
        this.statMgr.destroyChart();
        let fields = ['Distance', 'Speed', 'Cadence', 'Heart', 'Duration'];
        let filters =  [];
        filters.push($('#txtMinDistance').val()*1);
        filters.push($('#txtMaxDistance').val()*1);
        filters.push($('#txtMaxActivities').val()*1);        
        this.statMgr.buildChart('divStatsContainer', filters, fields);
    }
    build(containerId) {
        let res = $.Deferred();
        this.loadContent(containerId, htmlContent).done(() => {
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