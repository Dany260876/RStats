import './style.css';
import { $ } from 'jquery';
import { activityManager } from './class/activityManager';
import { componentManager } from './class/componentManager';
import { Chart } from 'chart.js/auto';

$("#app").html("<div id='divMenu'></div><div id='divContent'></div><div id='divFooter'></div>");

new activityManager().getActivities().done((activities) => {
    new componentManager().build(activities).done(() => {
        $('#divStatistics').hide();
        $('#divActivities').show();
        $($('.menuItem')[0]).addClass('active');
    });
});

