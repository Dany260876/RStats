import RSStatisticsManager from '../../class/RSStatisticsManager.js'

const rsStats = {
    initialize : () => {
        // init stats Manager
        rsStats.statsMgr = [];
        if (sessionStorage['RSActivities']) 
            rsStats.statsMgr = new RSStatisticsManager(JSON.parse(sessionStorage['RSActivities']));
        
        // Load page
        rsStats.initContent();
    },
    initContent: () => {

        let confStats = [   
            { name:'speed-avg', color:'blue' },
            { name:'fc-avg', color:'lightgreen' },
            { name:'rythm-avg', color:'red' },
            { name:'allure-avg', color:'green' } 
        ];
        
        let stats = rsStats.statsMgr.getStats(confStats);
        const chart = new CanvasJS.Chart('divChart', stats);
        chart.render();
        
        $('.canvasjs-chart-canvas').width('100%');
        $('.canvasjs-chart-canvas').height('300px');
    }
}

export default rsStats;