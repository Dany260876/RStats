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
            // TODO
            this.statMgr.buildPie('divOverviewContainer', 'Test 1');
            this.statMgr.buildPie('divOverviewContainer2', 'Test 2');
            
            res.resolve();
        }).fail(() => {
            res.reject();
        });
        return res.promise();
    }
}