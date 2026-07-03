import { localforage } from 'localforage';
import { Chart } from 'chart.js';
import { statsTools } from './statsTools';

export class statisticsManager {
    constructor(activities) {
        this.activities = activities;
        this.charts = [];
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
                if (type=='vo2') result.push(act.vO2MaxValue);
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
        let chart = new Chart(ctx, {
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
        this.charts.push(chart);
    }
    getPieStats(dataType, activityIds) {
        let result = {};
        result.labels = [];
        result.data = [];
        
        if (dataType=='distance') {
            let labels = ['0-4 km','4-7 km','7-9 km','9-11 km','11-20 km','20-22 km','22-45 km','>45 km'];
            let countActivities = this.activities.length;
            let data = [0,0,0,0,0,0,0,0];
            this.activities.forEach((act,i) => {
                if (activityIds.indexOf(act.activityId)>-1) {
                    let dist = act.distance/1000;
                    if (dist < 4) data[0]++;
                    if ((dist >= 4) && (dist<7)) data[1]++;
                    if ((dist >= 7) && (dist<9)) data[2]++;
                    if ((dist >= 9) && (dist<11)) data[3]++;
                    if ((dist >= 11) && (dist<20)) data[4]++;
                    if ((dist >= 20) && (dist<22)) data[5]++;
                    if ((dist >= 22) && (dist<45)) data[6]++;
                    if (dist >= 45) data[7]++;
                }
            });
            for(let i=0;i<8;i++) {
                data[i] = Math.round((data[i]*100)/countActivities);
                if (data[i]>0) {
                    result.labels.push(labels[i]);
                    result.data.push(data[i]);
                }
            }
        }

        if (dataType=='speed') {
            let labels = ['0-5 km/h','5-7 km/h','7-9 km/h','9-11 km/h','11-13 km/h','13-15 km/h','15-17 km/h','>17 km/h'];
            let countActivities = this.activities.length;
            let data = [0,0,0,0,0,0,0,0];
            this.activities.forEach((act,i) => {
                if (activityIds.indexOf(act.activityId)>-1) {
                    let speed = statsTools.getSpeedKph(act.averageSpeed);
                    if (speed < 5) data[0]++;
                    if ((speed >= 5) && (speed<7)) data[1]++;
                    if ((speed >= 7) && (speed<9)) data[2]++;
                    if ((speed >= 9) && (speed<11)) data[3]++;
                    if ((speed >= 11) && (speed<13)) data[4]++;
                    if ((speed >= 13) && (speed<15)) data[5]++;
                    if ((speed >= 15) && (speed<17)) data[6]++;
                    if (speed >= 17) data[7]++;
                }
            });
            for(let i=0;i<8;i++) {
                data[i] = Math.round((data[i]*100)/countActivities);
                if (data[i]>0) {
                    result.labels.push(labels[i]);
                    result.data.push(data[i]);
                }
            }
        }

        if (dataType=='zones') {
            let labels = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'];
            let totalTime = 0;
            let data = [0,0,0,0,0];
            this.activities.forEach((act,i) => {
                if (activityIds.indexOf(act.activityId)>-1) {
                    data[0] += act.hrTimeInZone_1;
                    data[1] += act.hrTimeInZone_2;
                    data[2] += act.hrTimeInZone_3;
                    data[3] += act.hrTimeInZone_4;
                    data[4] += act.hrTimeInZone_5;
                    totalTime += act.hrTimeInZone_1 + act.hrTimeInZone_2 + act.hrTimeInZone_3 + act.hrTimeInZone_4 + act.hrTimeInZone_5;
                }
            });
            for(let i=0;i<5;i++) {
                data[i] = Math.round((data[i]*100)/totalTime);
                if (data[i]>0) {
                    result.labels.push(labels[i]);
                    result.data.push(data[i]);
                }
            }
        }
        
        return result;
    }
    buildPie(containerName, title, dataType, filters) {
        let ids = this.getActivitiesId(filters);
        let pieData = this.getPieStats(dataType, ids);
        
        const ctx = document.getElementById(containerName);
        const data = {
          labels: pieData.labels,
          datasets: [
            {
              label: dataType,
              data: pieData.data
            }
          ]
        };
        const config = {
          type: 'pie',
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: title
              }
            }
          },
        };
        let pie = new Chart(ctx, config);
        this.charts.push(pie);
    }
    getRadarStats(activityIds) {
        let result = {};
        result.labels = ['Average Speed (km/h)', 'Average duration (min)', 'Average Vo2Max', 'Average distance (km)'];
        result.data = [0,0,0,0];

        this.activities.forEach((act,i) => {
            if (activityIds.indexOf(act.activityId)>-1) {
                result.data[0] += statsTools.getSpeedKph(act.averageSpeed);
                result.data[1] += act.duration;
                result.data[2] += Number.isInteger(act.vO2MaxValue)?act.vO2MaxValue:0;
                result.data[3] += act.distance/1000;
            }
        });

        result.data[0] = result.data[0] / activityIds.length;
        result.data[1] = result.data[1] / activityIds.length;
        result.data[2] = result.data[2] / activityIds.length;
        result.data[3] = result.data[3] / activityIds.length;

        result.data[1] = statsTools.getDurationMinutes(result.data[1]);

        return result;
    }
    buildRadar(containerName, title, filters) {
        let ids = this.getActivitiesId(filters);
        let radarData = this.getRadarStats(ids);
        const ctx = document.getElementById(containerName);
        
        const data = {
          labels: radarData.labels,
          datasets: [
            {
              label: 'Running Metrics',
              data: radarData.data,
              borderColor: 'grey',
              backgroundColor: 'lightgrey',
            }
          ]
        };
        const config = {
            type: 'radar',
            data: data,
            options: {
                responsive: true
            }
        };
        let radar = new Chart(ctx, config);
        this.charts.push(radar);
    }
    destroyChart() {
        this.charts.forEach((chart) => {
            chart.destroy(); 
        });
        this.charts = [];
    }
}