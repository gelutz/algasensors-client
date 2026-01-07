import { Component, computed, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, of } from 'rxjs';
import {
    Activity,
    AlertTriangle,
    LucideAngularModule,
    Thermometer,
    Wifi,
} from 'lucide-angular';
import { Card } from 'primeng/card';
import type { Sensor } from '../../../../models/sensor';
import { SensorAlert } from '../../../../models/sensor-alert';
import { TemperatureLog } from '../../../../models/temperature-log';
import { SensorService } from '../../../../services/sensor.service';

type AlertedSensor = {
    name: string;
    temperature: number;
    alertedAt: Date;
};

@Component({
    selector: 'app-dashboard-stats',
    imports: [Card, LucideAngularModule],
    templateUrl: './dashboard-stats.component.html',
})
export class DashboardStatsComponent {
    private sensorService = inject(SensorService);
    private destroyRef = inject(DestroyRef);

    WifiIcon = Wifi;
    ThermometerIcon = Thermometer;
    AlertTriangleIcon = AlertTriangle;
    ActivityIcon = Activity;

    sensors = input.required<Sensor[]>();

    lastAlertedSensor = signal<AlertedSensor | null>(null);

    sensorsOnline = computed(() => {
        const all = this.sensors();
        return all.filter((s) => s.enabled).length;
    });

    totalSensors = computed(() => this.sensors().length);

    averageTemperature = computed(() => {
        const all = this.sensors();
        const withTemp = all.filter(
            (s) => s.lastTemperature !== undefined && s.lastTemperature !== null,
        );
        if (withTemp.length === 0) return null;

        const sum = withTemp.reduce((acc, s) => acc + (s.lastTemperature ?? 0), 0);
        return (sum / withTemp.length).toFixed(1);
    });

    constructor() {
        effect(() => {
            const sensorList = this.sensors();
            if (sensorList.length > 0) {
                this.loadLastAlert(sensorList);
            }
        });
    }

    private loadLastAlert = (sensorList: Sensor[]): void => {
        const alertRequests = sensorList.map((sensor) =>
            forkJoin({
                sensor: of(sensor),
                alert: this.sensorService.getAlert(sensor.id),
                logs: this.sensorService.getTemperatureLogs(sensor.id, { size: 50, page: 0 }),
            })
        );

        forkJoin(alertRequests)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((results) => {
                const allAlerts: AlertedSensor[] = [];

                for (const { sensor, alert, logs } of results) {
                    if (!alert) continue;

                    const alertEvents = this.findAlertEvents(sensor, alert, logs.content);
                    allAlerts.push(...alertEvents);
                }

                allAlerts.sort((a, b) => b.alertedAt.getTime() - a.alertedAt.getTime());
                this.lastAlertedSensor.set(allAlerts[0] ?? null);
            });
    };

    private findAlertEvents = (
        sensor: Sensor,
        alert: SensorAlert,
        logs: TemperatureLog[]
    ): AlertedSensor[] => {
        const events: AlertedSensor[] = [];

        for (const log of logs) {
            const isAboveMax = alert.maxTemperature != null && log.value >= alert.maxTemperature;
            const isBelowMin = alert.minTemperature != null && log.value <= alert.minTemperature;

            if (isAboveMax || isBelowMin) {
                events.push({
                    name: sensor.name,
                    temperature: log.value,
                    alertedAt: new Date(log.registeredAt),
                });
            }
        }

        return events;
    };

    formatAlertTime = (): string => {
        const alertedSensor = this.lastAlertedSensor();
        if (!alertedSensor) return '';

        const now = new Date();
        const diff = now.getTime() - alertedSensor.alertedAt.getTime();
        const minutes = Math.floor(diff / 1000 / 60);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;

        return `${Math.floor(hours / 24)}d ago`;
    };
}

