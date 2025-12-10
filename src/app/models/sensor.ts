export interface Sensor {
    id: string;
    name: string;
    temperature: number;
    minAlarm: number | null;
    maxAlarm: number | null;
    isOnline: boolean;
}
