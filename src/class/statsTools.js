export class statsTools {
    constructor() {}
    getFormattedDuration(durationSeconds) {
        let sec = Math.floor(durationSeconds)%60;
        let secFormatted = ":" + sec;
        if (sec<10) secFormatted = ":0" + sec;
        return ((Math.floor(durationSeconds)-sec)/60) + secFormatted;
    }
    getSpeedKph(speedMps) {
        return speedMps*60*60/1000;
    }
}