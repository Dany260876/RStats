import { $ } from 'jquery';

export class component
{
    constructor() {}
    loadContent(containerId, htmlContent) {
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