import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sensor } from '../../../models/sensor';

export type SensorInput = Pick<Sensor, 'name' | 'location' | 'ip'>;

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    sensorAdded$ = new Subject<SensorInput>();
}
