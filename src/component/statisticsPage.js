import { $ } from 'jquery';
import { component } from '../class/component';
import htmlContent from './statisticsPage.html?raw';

export class statisticsPage extends component
{
    constructor(activities) {
        super();
        this.activities = activities;
    }
    build(containerId) {
        let res = $.Deferred();
        this.loadContent(containerId, htmlContent).done(() => {
            res.resolve();
        }).fail(() => {
            res.reject();
        });
        return res.promise();
    }
}