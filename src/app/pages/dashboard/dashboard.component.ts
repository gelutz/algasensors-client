import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor.service';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSensorGridComponent } from './components/dashboard-sensor-grid/dashboard-sensor-grid.component';
import { DashboardService } from './components/dashboard.service';

@Component({
    selector: 'app-dashboard',
    template: `
    <div class="p-4 w-full">
        <app-dashboard-header></app-dashboard-header>
        <app-dashboard-sensor-grid class="flex gap-4 flex-wrap" [sensors]="(sensors$ | async) || []"></app-dashboard-sensor-grid>
    </div>
        `,
    imports: [
        CommonModule,
        AsyncPipe,
        DashboardHeaderComponent,
        DashboardSensorGridComponent,
    ],
})
export class DashboardComponent {
    sensorService = inject(SensorService);
    dashboardService = inject(DashboardService);

    sensors$ = new BehaviorSubject<Sensor[]>([]);

    constructor() {
        this.sensorService
            .getPagedSensors()
            .pipe(takeUntilDestroyed())
            .subscribe((response) => {
                this.sensors$.next(response.content.reverse());
            });

        this.dashboardService.sensorAdded$
            .pipe(takeUntilDestroyed())
            .subscribe((newSensor) => {
                this.sensors$.next([newSensor, ...this.sensors$.value]);
            });

        this.dashboardService.sensorDeleted$
            .pipe(takeUntilDestroyed())
            .subscribe((sensorId) => {
                this.sensors$.next([
                    ...this.sensors$.value.filter((s) => s.id !== sensorId),
                ]);
            });
    }
}
