import { Injectable } from '@angular/core';
import { Sensor } from '../models/sensor';
import { PageableParams, PageableResponse, Service } from './service';

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
        return this.http.get<Sensor>(`${this.managerUrl}/${sensorId}`);
    };
}
