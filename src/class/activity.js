export class activity
{
    constructor(objActivity) {
        this.activityId = objActivity.activityId;
        this.activityName = objActivity.activityName.replace('Course à pied','');
        this.activityType = objActivity.activityType.typeKey;
        this.activityUUID = objActivity.activityUUID;
        this.aerobicTrainingEffect = objActivity.aerobicTrainingEffect;
        this.aerobicTrainingEffectMessage = objActivity.aerobicTrainingEffectMessage;
        this.anaerobicTrainingEffect = objActivity.anaerobicTrainingEffect;
        this.anaerobicTrainingEffectMessage = objActivity.anaerobicTrainingEffectMessage;
        this.averageHR = objActivity.averageHR;
        this.averageRunningCadenceInStepsPerMinute = objActivity.averageRunningCadenceInStepsPerMinute;
        this.averageSpeed = objActivity.averageSpeed;
        this.avgElevation = objActivity.avgElevation;
        this.avgStrideLength = objActivity.avgStrideLength;
        this.calories = objActivity.calories;
        this.distance = objActivity.distance;
        this.duration = objActivity.duration;
        this.elapsedDuration = objActivity.elapsedDuration;
        this.elevationGain = objActivity.elevationGain;
        this.elevationLoss = objActivity.elevationLoss;
        this.endTimeGMT = objActivity.endTimeGMT;
        this.hrTimeInZone_1 = objActivity.hrTimeInZone_1;
        this.hrTimeInZone_2 = objActivity.hrTimeInZone_2;
        this.hrTimeInZone_3 = objActivity.hrTimeInZone_3;
        this.hrTimeInZone_4 = objActivity.hrTimeInZone_4;
        this.hrTimeInZone_5 = objActivity.hrTimeInZone_5;
        this.locationName = objActivity.locationName;
        this.maxDoubleCadence = objActivity.maxDoubleCadence;
        this.maxElevation = objActivity.maxElevation;
        this.maxHR = objActivity.maxHR;
        this.maxRunningCadenceInStepsPerMinute = objActivity.maxRunningCadenceInStepsPerMinute;
        this.maxSpeed = objActivity.maxSpeed;
        this.maxTemperature = objActivity.maxTemperature;
        this.maxVerticalSpeed = objActivity.maxVerticalSpeed;
        this.minElevation = objActivity.minElevation;
        this.minTemperature = objActivity.minTemperature;
        this.movingDuration = objActivity.movingDuration;
        this.startTimeGMT = objActivity.startTimeGMT;
        this.startTimeLocal = objActivity.startTimeLocal;
        this.steps = objActivity.steps;
        this.vO2MaxValue = objActivity.vO2MaxValue;
    }
}