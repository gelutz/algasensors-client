import { Component, input } from '@angular/core';
import { LucideAngularModule, ThermometerIcon } from 'lucide-angular';
import { Badge } from 'primeng/badge';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import type { Sensor } from '../../../../models/sensor';

@Component({
    selector: 'app-dashboard-sensor-card',
    imports: [Card, Badge, LucideAngularModule, Divider],
    template: `
        <p-card class="w-72 border">
            <ng-template #header>
                <div class="p-4 h-20">
                    <div class="flex justify-between gap-2">
                        <div class="flex flex-col max-w-40 min-h-4">
                            <span class="font-semibold">{{sensor().name}}</span>
                        </div>
                        <p-badge [value]="sensor().enabled ? 'Online' : 'Offline'" [severity]="sensor().enabled ? 'success' : 'danger'"></p-badge>
                    </div>
                    <small class="text-muted-color font-mono">{{sensor().ip}}</small>
                </div>
            </ng-template>

            <h1 class="text-3xl font-bold flex items-center" [class.text-muted-color]="!sensor().lastTemperature">
                <lucide-icon [img]="ThermometerIcon" size="30" name="thermometer"></lucide-icon>
                {{sensor().lastTemperature ?? '--.-'}} ⁰C
            </h1>

            <p-divider></p-divider>
            <div class="flex items-center justify-between text-surface-600">
                <div class="text-sm flex flex-col">
                    <span>Min:</span>
                    <span class="text-color font-semibold">-- ⁰C</span>
                </div>

                <div class="text-sm flex flex-col">
                    <span>Max:</span>
                    <span class="text-color font-semibold">-- ⁰C</span>
                </div>
            </div>
        </p-card>
    `,
})
export class DashboardSensorCardComponent {
    ThermometerIcon = ThermometerIcon;
    sensor = input.required<Sensor>();
}
