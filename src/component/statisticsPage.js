import { $ } from 'jquery';
import htmlContent from './statisticsPage.html?raw';

export class statisticsPage 
{
    constructor(activities) {
        this.activities = activities;
    }
    build(containerId) {
        let res = $.Deferred();
        try {
            let html = $("#" + containerId).html();
            $("#" + containerId).html(html + htmlContent);
            res.resolve();    
        }
        catch(err) {
            console.log(err);
            res.reject();                
        }
        return res.promise();
    }
}