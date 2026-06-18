import { activityType } from './activityType';

export class activity
{
    constructor(objActivity) {
        this.activityId = objActivity.activityId;
        this.activityName = objActivity.activityName;
        this.startTimeLocal = objActivity.startTimeLocal;
        this.startTimeGMT = objActivity.startTimeGMT;
        this.activityType = new activityType(objActivity.activityType);
        this.distance = objActivity.distance;
        this.duration = objActivity.duration;
        this.elapsedDuration = objActivity.elapsedDuration;
        this.movingDuration = objActivity.movingDuration;
        this.elevationGain = objActivity.elevationGain;
        this.elevationLoss = objActivity.elevationLoss;
        this.averageSpeed = objActivity.averageSpeed;
        this.maxSpeed = objActivity.maxSpeed;
        this.calories = objActivity.calories;
        this.averageHR = objActivity.averageHR;
        this.maxHR = objActivity.maxHR;
        this.averageRunningCadenceInStepsPerMinute = objActivity.averageRunningCadenceInStepsPerMinute;
        this.maxRunningCadenceInStepsPerMinute = objActivity.maxRunningCadenceInStepsPerMinute;
        this.steps = objActivity.steps;
        this.aerobicTrainingEffect = objActivity.aerobicTrainingEffect;
        this.anaerobicTrainingEffect = objActivity.anaerobicTrainingEffect;
        this.avgStrideLength = objActivity.avgStrideLength;
        this.vO2MaxValue = objActivity.vO2MaxValue;
        this.minTemperature = objActivity.minTemperature;
        this.maxTemperature = objActivity.maxTemperature;
        this.minElevation = objActivity.minElevation;
        this.maxElevation = objActivity.maxElevation;
        this.avgElevation = objActivity.avgElevation;
        this.maxDoubleCadence = objActivity.maxDoubleCadence;
        this.maxVerticalSpeed = objActivity.maxVerticalSpeed;
        this.locationName = objActivity.locationName;
        this.aerobicTrainingEffectMessage = objActivity.aerobicTrainingEffectMessage;
        this.anaerobicTrainingEffectMessage = objActivity.anaerobicTrainingEffectMessage;
        this.endTimeGMT = objActivity.endTimeGMT;
        this.activityUUID = objActivity.activityUUID;
    }
}