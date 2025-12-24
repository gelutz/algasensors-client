import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor.service';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardSensorGridComponent } from './components/dashboard-sensor-grid/dashboard-sensor-grid.component';

@Component({
    selector: 'button-demo',
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
export class DashboardComponent implements OnInit {
    sensorService = inject(SensorService);

    sensors$ = new BehaviorSubject<Sensor[]>([]);

    ngOnInit() {
        this.sensorService.getAllSensors().subscribe((sensors) => {
            this.sensors$.next(sensors);
        });
    }
}
