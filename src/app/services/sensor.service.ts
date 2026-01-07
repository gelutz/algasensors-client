import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';
import { Sensor } from '../models/sensor';
import { SensorAlert, SensorAlertInput } from '../models/sensor-alert';
import { TemperatureLog } from '../models/temperature-log';
import { PageableParams, PageableResponse, Service } from './service';

type SensorInput = {
    name: string;
    ip: string;
    location: string;
    protocol?: string;
    model?: string;
};

type SensorDetailResponse = {
    sensorOutput: Sensor;
    details: {
        id: string;
        enabled: boolean;
        lastTemperature?: number;
        updatedAt?: Date;
    };
};

export type DailyMedianTemperature = {
    date: string;
    medianTemperature: number | null;
};

@Injectable({
    providedIn: 'root',
})
export class SensorService extends Service {
    alertUpdated$ = new Subject<SensorAlert>();
    alertDeleted$ = new Subject<string>();

    getPagedSensors = (pageable?: PageableParams) => {
        return this.http.get<PageableResponse<Sensor>>(this.managerUrl, {
            params: pageable && this.parsePageableParams(pageable),
        });
    };

    getSensorDetails = (sensorId: Sensor['id']) => {
        return this.http.get<SensorDetailResponse>(
            `${this.managerUrl}/${sensorId}/details`,
        );
    };

    createSensor = (input: SensorInput): Observable<Sensor> => {
        return this.http.post<Sensor>(`${this.managerUrl}`, input);
    };

    deleteSensor(sensorId: string) {
        return this.http.delete<Sensor>(`${this.managerUrl}/${sensorId}`);
    }

    enable(sensorId: string) {
        return this.http.put<void>(`${this.managerUrl}/${sensorId}/enable`, {});
    }

    disable(sensorId: string) {
        return this.http.delete<void>(`${this.managerUrl}/${sensorId}/enable`);
    }

    getDailyMedianTemperatures = (sensorId: string) => {
        return this.http.get<DailyMedianTemperature[]>(
            `${this.managerUrl}/${sensorId}/temperatures/daily-median`,
        );
    };

    getTemperatureHistory = (sensorId: string, days: number) => {
        return this.http.get<TemperatureLog[]>(
            `${this.managerUrl}/${sensorId}/temperatures/history`,
            { params: { days: days.toString() } }
        );
    };

    getAlert = (sensorId: string): Observable<SensorAlert | null> => {
        return this.http.get<SensorAlert>(`${this.monitorUrl}/${sensorId}/alert`).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                    return of(null);
                }
                throw error;
            })
        );
    };

    saveAlert = (sensorId: string, input: SensorAlertInput): Observable<SensorAlert> => {
        return this.http.put<SensorAlert>(`${this.monitorUrl}/${sensorId}/alert`, input);
    };

    deleteAlert = (sensorId: string): Observable<void> => {
        return this.http.delete<void>(`${this.monitorUrl}/${sensorId}/alert`);
    };

    getTemperatureLogs = (sensorId: string, pageable?: PageableParams): Observable<PageableResponse<TemperatureLog>> => {
        return this.http.get<PageableResponse<TemperatureLog>>(
            `${this.monitorUrl}/${sensorId}/temperatures`,
            { params: pageable && this.parsePageableParams(pageable) }
        );
    };
}
