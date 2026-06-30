import { $ } from 'jquery';
import { activitiesPage } from '../component/activitiesPage';
import { statisticsPage } from '../component/statisticsPage';
import { overviewPage } from '../component/overviewPage';
import { configurationPage } from '../component/configurationPage';
import { mainMenu } from '../component/mainMenu';

export class componentManager {
    constructor() {
    }
    build(activities) {
        let def = $.Deferred();
        let res = [];
        res.push(new mainMenu().build('divMenu'));
        res.push(new activitiesPage(activities).build('divContent'));
        res.push(new statisticsPage(activities).build('divContent'));
        res.push(new overviewPage(activities).build('divContent'));
        res.push(new configurationPage(activities).build('divContent'));
        $.when(res).done(() => {
            def.resolve();
        });
        return def.promise();
    }
}