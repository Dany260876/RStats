import { $ } from 'jquery';
import htmlContent from './mainMenu.html?raw';

export class mainMenu 
{
    constructor() {
    }
    build(containerId) {
        let res = $.Deferred();
        try {
            $("#" + containerId).html(htmlContent);
            $(".menuItem").click(() => this.clicMenu());
            res.resolve();    
        }
        catch(err) {
            console.log(err);
            res.reject();                
        }
        return res.promise();
    }
    clicMenu() {
        $('#divStatistics').hide();
        $('#divActivities').hide();
        let val = $(event.currentTarget).data('name');
        if (val=='statistics') $('#divStatistics').show();
        if (val=='activities') $('#divActivities').show();
    }
}