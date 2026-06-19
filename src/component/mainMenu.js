import { $ } from 'jquery';
import { component } from '../class/component';
import htmlContent from './mainMenu.html?raw';

export class mainMenu extends component
{
    constructor() {
        super();
    }
    build(containerId) {
        let res = $.Deferred();
        this.loadContent(containerId, htmlContent).done(() => {
            $(".menuItem").click(() => this.clicMenu());
            res.resolve();
        }).fail(() => {
            res.reject();
        });
        return res.promise();
    }
    clicMenu() {
        $('.menuItem').removeClass('active');
        $('#divStatistics').hide();
        $('#divActivities').hide();
        let val = $(event.currentTarget).data('name');
        if (val=='statistics') $('#divStatistics').show();
        if (val=='activities') $('#divActivities').show();
        $(event.currentTarget).addClass('active');
    }
}