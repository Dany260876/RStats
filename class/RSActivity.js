import RSStatistics from './RSStatistics.js';

export default class RSActivity {
    constructor(type, name, location, date, distance, duration) {
        this.id = "act_" + new Date().getTime();
        this.date = new Date(date);
        this.type = type;
        this.name = name;
        this.location = location;
        this.duration = duration;
        this.distance = distance;
        this.statistics = new RSStatistics();
    }
}