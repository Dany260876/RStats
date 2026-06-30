import { $ } from 'jquery';

export class component
{
    constructor() {}
    loadContent(containerId, htmlContent) {
        let res = $.Deferred();
        try {
            $("#" + containerId).append(htmlContent);
            res.resolve();    
        }
        catch(err) {
            console.log(err);
            res.reject();                
        }
        return res.promise();
    }
}