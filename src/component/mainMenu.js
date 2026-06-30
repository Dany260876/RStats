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
    showPageContent(page) {
        let divId = "div" + page[0].toUpperCase() + page.substr(1, page.length-1);
        $('#' + divId).show();
    }
    clicMenu() {
        $('.menuItem').removeClass('active');
        $('.pageContainer').hide();
        let val = $(event.currentTarget).data('name');
        this.showPageContent(val);
        $(event.currentTarget).addClass('active');
    }
}