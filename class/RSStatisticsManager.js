export default class RSStatisticsManager {
    constructor(activities) {
        this.activities = activities;
    }
    getChartConfig() {
        let config = {
        	animationEnabled: true,
        	theme: "light2",
            axisX:{
                labelFontSize: 10,
                labelFontColor: "#353535"
        	},
        	axisY: {
				labelFontSize: 10,
				labelFontColor: "#353535"
        	},
            axisY2: {
				labelFontSize: 10,
				labelFontColor: "#353535"
        	},
        	data: []
        };
        return config;
    }
    getStatValue(name, statistics) {
        let val = 0;
        if (name=='speed-avg') val = statistics.Speed.avgValue;
        if (name=='speed-max') val = statistics.Speed.maxValue;
        if (name=='allure-avg') val = statistics.Allure.avgValue;
        if (name=='allure-max') val = statistics.Allure.maxValue;
        if (name=='fc-avg') val = statistics.FC.avgValue;
        if (name=='fc-max') val = statistics.FC.maxValue;
        if (name=='rythm-avg') val = statistics.Rythm.avgValue;
        if (name=='rythm-max') val = statistics.Rythm.maxValue;
        if (name=='rythm-len') val = statistics.Rythm.avgLength;
        return val;
    }
    getAxis(name) {
        let axisType = 'primary';
        if (name=='fc-avg') axisType = 'secondary';
        if (name=='fc-max') axisType = 'secondary';
        if (name=='rythm-avg') axisType = 'secondary';
        if (name=='rythm-max') axisType = 'secondary';
        return axisType;
    }
    getChartType(name) {
        let chartType = 'line';
        /*
        if (name=='fc-avg') chartType = 'column';
        if (name=='fc-max') chartType = 'column';
        if (name=='rythm-avg') chartType = 'column';
        if (name=='rythm-max') chartType = 'column';
        */
        return chartType;
    }
    getStats(typesStats) {
        let resultStats = this.getChartConfig();      
        typesStats.forEach((typeStat) => {          
            let result = {
        		type: this.getChartType(typeStat.name),
        		showInLegend: true,
        		name: typeStat.name,
        		color: typeStat.color,
                axisYType: this.getAxis(typeStat.name),
                indexLabelFontSize: 12,
                indexLabelFontColor: typeStat.color,
                indexLabel: "{y}",
        		dataPoints: []
            }
            this.activities.forEach((act) => {
                let val = this.getStatValue(typeStat.name, act.statistics);
                result.dataPoints.push({
                    label: new Date(act.date).toLocaleDateString(),
                    y: val
                });
            });
            resultStats.data.push(result); 
        });
        return resultStats;
    }
}