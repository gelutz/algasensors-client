import { Injectable, signal } from '@angular/core';
import { Sensor } from '../models/sensor';

@Injectable({
    providedIn: 'root',
})
export class SensorService {
    readonly sensors = signal<Sensor[]>([
        {
            id: '1',
            name: 'Sensor 1',
            temperature: 25.5,
            minAlarm: 10,
            maxAlarm: 30,
            isOnline: true,
        },
        {
            id: '2',
            name: 'Sensor 2',
            temperature: 15.0,
            minAlarm: null,
            maxAlarm: 20,
            isOnline: true,
        },
        {
            id: '3',
            name: 'Sensor 3',
            temperature: 45.2,
            minAlarm: 20,
            maxAlarm: 40,
            isOnline: false,
        },
        {
            id: '4',
            name: 'Sensor 4',
            temperature: -5.0,
            minAlarm: 0,
            maxAlarm: null,
            isOnline: true,
        },
        {
            id: '5',
            name: 'Sensor 5',
            temperature: 22.0,
            minAlarm: 18,
            maxAlarm: 26,
            isOnline: true,
        },
        {
            id: '6',
            name: 'Sensor 6',
            temperature: 35.0,
            minAlarm: null,
            maxAlarm: null,
            isOnline: true,
        },
    ]);

    updateSensor(id: string, settings: { minAlarm: number | null; maxAlarm: number | null }) {
        this.sensors.update((sensors) =>
            sensors.map((s) =>
                s.id === id ? { ...s, minAlarm: settings.minAlarm, maxAlarm: settings.maxAlarm } : s
            )
        );
    }
}
