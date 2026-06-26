import { $ } from 'jquery';
import { activitiesPage } from '../component/activitiesPage';
import { statisticsPage } from '../component/statisticsPage';
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
        $.when(res).done(() => {
            def.resolve();
        });
        return def.promise();
    }
}