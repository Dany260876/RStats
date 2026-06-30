export class statsTools {
    constructor() {}
    static getFormattedDuration(durationSeconds) {
        let sec = Math.floor(durationSeconds)%60;
        let secFormatted = "'" + sec;
        if (sec<10) secFormatted = "'0" + sec;
        return ((Math.floor(durationSeconds)-sec)/60) + secFormatted;
    }
    static getDurationMinutes(durationSeconds) {
        return (durationSeconds/60)
    }
    static getSpeedKph(speedMps) {
        return speedMps*60*60/1000;
    }
    static getZonesFromFCMax(fcMax) {
        let result = {};
        result.z1_Min = fcMax*50/100;
        result.z1_Max = fcMax*60/100;
        result.z2_Min = fcMax*60/100;
        result.z2_Max = fcMax*70/100;
        result.z3_Min = fcMax*70/100;
        result.z3_Max = fcMax*80/100;
        result.z4_Min = fcMax*80/100;
        result.z4_Max = fcMax*90/100;
        result.z5_Min = fcMax*90/100;
        result.z5_Max = fcMax;
        return result;
    }
}