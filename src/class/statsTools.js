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
    static getDistanceKm(distanceMeters) {
        return distanceMeters/1000;
    }
    static getTrainingEffect(value) {
        for (let i=0;i<10;i++) value = value.replaceAll(i,'');
        value = value.replaceAll('_',' ');
        value = value.toLowerCase();
        value = value.replace('anaerobic','');
        value = value.replace('aerobic','');
        value = value.replaceAll('  ',' ');
        value = value[0].toUpperCase() + value.substring(1);
        return value;
    }
    static formatField(value, format) {
        if (format=='km') return statsTools.getDistanceKm(value).toFixed(2);
        if (format=='minsec') return statsTools.getFormattedDuration(value);
        if (format=='min') return statsTools.getDurationMinutes(value).toFixed(2);
        if (format=='kph') return statsTools.getSpeedKph(value).toFixed(2);
        if (format=='rnd1') return value.toFixed(1);
        if (format=='rnd2') return value.toFixed(2);
        if (format=='rnd3') return value.toFixed(3);
        if (format=='rnd1') return value.toFixed(4);
        if (format=='training_fx') return statsTools.getTrainingEffect(value);
        return value;
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