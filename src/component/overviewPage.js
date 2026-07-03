import { $ } from 'jquery';
import { component } from '../class/component'
import { statisticsManager } from '../class/statisticsManager'
import htmlContent from './overviewPage.html?raw';

export class overviewPage extends component
{
    constructor(activities) {
        super();
        this.statMgr = new statisticsManager(activities);
    }
    build(containerId) {
        let res = $.Deferred();
        this.loadContent(containerId, htmlContent).done(() => {
            this.renderStats();
            $('#btnFilterOverview').click(() => {
                this.statMgr.destroyChart();
                this.renderStats();
            });            
            res.resolve();
        }).fail(() => {
            res.reject();
        });
        return res.promise();
    }
    renderStats() {
        // get filters
        let filters = [];
        filters.push($('#txtMinDistanceOverview').val());
        filters.push($('#txtMaxDistanceOverview').val());
        filters.push($('#txtMaxActivitiesOverview').val());
        
        // Generate pies
        this.statMgr.buildPie('divOverviewContainer', '% Running distances', 'distance', filters);
        this.statMgr.buildPie('divOverviewContainer2', '% Average speed', 'speed', filters);
        this.statMgr.buildPie('divOverviewContainer3', '% Time in running zones', 'zones', filters);
        this.statMgr.buildRadar('divOverviewContainer4', 'Radar statistics', filters);
    }
}