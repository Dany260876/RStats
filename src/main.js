import './style.css';
import { $ } from 'jquery';
import { activityManager } from './class/activityManager';
import { listActivities } from './component/listActivities';

let mgr = new activityManager();
mgr.getActivities().done((activities) => {
    new listActivities(activities).build().done(() => {
    });
});

