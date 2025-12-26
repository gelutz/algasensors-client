import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
    catchError,
    delay,
    EMPTY,
    map,
    Observable,
    of,
    Subject,
    tap,
} from 'rxjs';
import { Sensor } from '../../../models/sensor';
import { SensorService } from '../../../services/sensor.service';

export type SensorInput = Pick<
    Sensor,
    'name' | 'location' | 'ip' | 'model' | 'protocol'
>;

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private sensorService = inject(SensorService);
    private _sensorAdded$ = new Subject<Sensor>();
    sensorDeleted$ = new Subject<Sensor['id']>();

    state = signal<{ addingSensor: boolean }>({
        addingSensor: false,
    });

    get sensorAdded$() {
        return this._sensorAdded$.asObservable();
    }

    addSensor = (input: SensorInput): Observable<Sensor> => {
        this.state.update((prev) => ({ ...prev, addingSensor: true }));
        return this.sensorService.createSensor(input).pipe(
            delay(5000),
            catchError((error) => {
                console.error(error);
                if (error instanceof HttpErrorResponse) {
                }

                return EMPTY;
            }),
            tap((sensor) => {
                this._sensorAdded$.next(sensor);
                this.state.update((prev) => ({
                    ...prev,
                    addingSensor: false,
                }));
            }),
        );
    };

    deleteSensor = (sensorId: Sensor['id']): Observable<Sensor['id']> => {
        return this.sensorService.deleteSensor(sensorId).pipe(
            delay(500),
            tap(() => this.sensorDeleted$.next(sensorId)),
            map(() => sensorId),
        );
    };

    enableSensor(sensorId: Sensor['id']): Observable<boolean> {
        return this.sensorService.enable(sensorId).pipe(
            map(() => true),
            catchError(() => of(false)),
        );
    }

    disableSensor(sensorId: Sensor['id']): Observable<boolean> {
        return this.sensorService.disable(sensorId).pipe(
            map(() => true),
            catchError(() => of(false)),
        );
    }
}
