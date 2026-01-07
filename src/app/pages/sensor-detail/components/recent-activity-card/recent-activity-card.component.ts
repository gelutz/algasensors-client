import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Sensor } from '../../../../models/sensor';
import { SensorAlert } from '../../../../models/sensor-alert';
import { TemperatureLog } from '../../../../models/temperature-log';
import { SensorService } from '../../../../services/sensor.service';

type ActivityStatus = 'Normal' | 'Warning';

type ActivityEvent = {
    timestamp: string;
    eventType: string;
    value: string;
    status: ActivityStatus;
};

@Component({
    selector: 'app-recent-activity-card',
    imports: [Card, TableModule, Tag],
    templateUrl: './recent-activity-card.component.html',
})
export class RecentActivityCardComponent {
    private sensorService = inject(SensorService);

    sensor = input<Sensor | null>(null);
    alert = input<SensorAlert | null>(null);

    temperatureLogs = signal<TemperatureLog[]>([]);
    loading = signal(false);

    activities = computed<ActivityEvent[]>(() => {
        const logs = this.temperatureLogs();
        const alertSettings = this.alert();

        return logs.map((log) => {
            const isAboveMax = alertSettings?.maxTemperature != null && log.value >= alertSettings.maxTemperature;
            const isBelowMin = alertSettings?.minTemperature != null && log.value <= alertSettings.minTemperature;
            const isThresholdAlert = isAboveMax || isBelowMin;

            return {
                timestamp: this.formatTimestamp(log.registeredAt),
                eventType: isThresholdAlert ? 'Threshold Alert' : 'Periodic Sync',
                value: `${log.value.toFixed(1)}°C`,
                status: isThresholdAlert ? 'Warning' : 'Normal',
            } as ActivityEvent;
        });
    });

    constructor() {
        effect(() => {
            const sensorId = this.sensor()?.id;
            if (sensorId) {
                this.loadTemperatureLogs(sensorId);
            }
        });
    }

    private loadTemperatureLogs = (sensorId: string): void => {
        this.loading.set(true);
        this.sensorService.getTemperatureLogs(sensorId, { page: 0, size: 10 }).subscribe({
            next: (response) => {
                this.temperatureLogs.set(response.content);
                this.loading.set(false);
            },
            error: () => this.loading.set(false),
        });
    };

    private formatTimestamp = (isoString: string): string => {
        const date = new Date(isoString);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        const timeStr = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        if (isToday) {
            return `Today, ${timeStr}`;
        }

        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday, ${timeStr}`;
        }

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        }) + `, ${timeStr}`;
    };

    getStatusSeverity = (status: ActivityStatus): 'success' | 'warn' => {
        return status === 'Normal' ? 'success' : 'warn';
    };
}
