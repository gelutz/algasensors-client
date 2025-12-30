import { Component, computed, input } from '@angular/core';
import {
    Activity,
    AlertTriangle,
    LucideAngularModule,
    Thermometer,
    Wifi,
} from 'lucide-angular';
import { Card } from 'primeng/card';
import type { Sensor } from '../../../../models/sensor';

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
    WifiIcon = Wifi;
    ThermometerIcon = Thermometer;
    AlertTriangleIcon = AlertTriangle;
    ActivityIcon = Activity;

    sensors = input.required<Sensor[]>();

    lastAlertedSensor: AlertedSensor = {
        name: 'Sensor Freezer #3',
        temperature: -28.5,
        alertedAt: new Date(Date.now() - 1000 * 60 * 15),
    };

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

    formatAlertTime = (): string => {
        const now = new Date();
        const diff = now.getTime() - this.lastAlertedSensor.alertedAt.getTime();
        const minutes = Math.floor(diff / 1000 / 60);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;

        return `${Math.floor(hours / 24)}d ago`;
    };
}

