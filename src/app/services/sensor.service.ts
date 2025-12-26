import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from '../models/sensor';
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

@Injectable({
    providedIn: 'root',
})
export class SensorService extends Service {
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
}
