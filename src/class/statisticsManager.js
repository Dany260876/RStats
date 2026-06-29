import { localforage } from 'localforage';
import { Chart } from 'chart.js';
import { statsTools } from './statsTools';

export class statisticsManager {
    constructor(activities) {
        this.activities = activities;
        console.log(this.activities);
    }
    getLabels(activityIds) {
        let result = [];
        this.activities.forEach((act,i) => {
            if (activityIds.indexOf(act.activityId)>-1) {
                let name = act.activityName.replace('Course à pied','')
                let startDate = act.startTimeLocal.split(' ')[0];
                result.push(name + "(" + startDate + ")");
            }
                
        });
        return result;
    }
    getData(type, activityIds) {
        let result = [];
        this.activities.forEach((act,i) => {
            if (activityIds.indexOf(act.activityId)>-1) {
                if (type=='distance') result.push(act.distance/1000);
                if (type=='duration') result.push(statsTools.getDurationMinutes(act.duration));
                if (type=='speed') result.push(statsTools.getSpeedKph(act.averageSpeed));
                if (type=='cadence') result.push(act.averageRunningCadenceInStepsPerMinute);
                if (type=='heart') result.push(act.averageHR);
                if (type=='steps') result.push(act.avgStrideLength);
            }
        });
        return result;
    }
    buildDatasets(fields, activityIds) {
        let results = [];
        fields.forEach((field,i) => {
            let data =  this.getData(field.toLowerCase(), activityIds);
            let axisName = 'y';
            let typeName = 'bar';
            if (data[0]>=70) {
                axisName = 'y1';
                typeName = 'line';
            }
            results.push({
                type: typeName,
                label: field,
                data: data,
                borderWidth: 1,
                yAxisID: axisName
            });
        });
        return results;
    }
    getActivitiesId(filters) {
        let results = [];
        // get filters
        let minDistance = filters[0]; 
        let maxDistance = filters[1];
        let maxActivities = filters[2];
        // filter activities
        this.activities.forEach((act,i) => {
            if ((results.length<maxActivities) && (act.distance>=minDistance) && (act.distance<=maxDistance))
                results.push(act.activityId);
        });
        return results;
    }
    buildChart(containerName, filters, fields) {
        let activities = this.getActivitiesId(filters);
        const ctx = document.getElementById(containerName);
        this.chart = new Chart(ctx, {
            data: {
              labels: this.getLabels(activities),
              datasets: this.buildDatasets(fields, activities)
            },
            options: {
              scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 70
                }
              }
            }
          });
    }
    destroyChart() {
        this.chart.destroy();
    }
}