import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import type { Sensor } from '../../../../models/sensor';
import { DashboardSensorCardComponent } from '../dashboard-sensor-card/dashboard-sensor-card.component';
import { DashboardService } from '../dashboard.service';
import { SkeletonCardComponent } from './skeleton-card.component';
@Component({
    selector: 'app-dashboard-sensor-grid',
    imports: [
        CommonModule,
        DashboardSensorCardComponent,
        SkeletonCardComponent,
    ],
    template: `
    <div class="w-full flex flex-wrap gap-4 justify-center md:justify-start">
        @if (addingSensor()) {
            <app-skeleton-card />
        }
        @for (sensor of sensors(); track sensor.id) {
            <app-dashboard-sensor-card [sensor]="sensor" />
        }
    </div>
    `,
})
export class DashboardSensorGridComponent {
    sensors = input<Sensor[]>([]);

    dashboardService = inject(DashboardService);
    addingSensor = computed(() => this.dashboardService.state().addingSensor);
}
