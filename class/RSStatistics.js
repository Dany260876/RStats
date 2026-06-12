import RSFc from '/class/RSFc.js';
import RSAllure from '/class/RSAllure.js';
import RSRythm from '/class/RSRythm.js';
import RSSpeed from '/class/RSSpeed.js';

export default class RSStatistics {
    constructor() {
        this.FC = new RSFc(0,0);
        this.Allure = new RSAllure(0,0);
        this.Speed = new RSSpeed(0,0);
        this.Rythm = new RSRythm(0,0,0);
    }
    setFc(avg, max) {
        this.FC = new RSFc(avg, max);
    }
    setAllure(avg, max) {
        this.Allure = new RSAllure(avg, max);
    }
    setSpeed(avg, max) {
        this.Speed = new RSSpeed(avg, max);
    }
    setRythm(avg, max, length) {
        this.Rythm = new RSRythm(avg, max, length);
    }
}
