import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import type { Sensor } from '../../../../models/sensor';
import { DashboardSensorCardComponent } from '../dashboard-sensor-card/dashboard-sensor-card.component';
@Component({
    selector: 'app-dashboard-sensor-grid',
    imports: [CommonModule, DashboardSensorCardComponent],
    template: `
    <div class="w-fullmx-auto flex flex-wrap gap-4">
        @for (sensor of sensors(); track $index) {
            <app-dashboard-sensor-card [sensor]="sensor" />
        }
    </div>
    `,
})
export class DashboardSensorGridComponent {
    sensors = input<Sensor[]>([]);
}
