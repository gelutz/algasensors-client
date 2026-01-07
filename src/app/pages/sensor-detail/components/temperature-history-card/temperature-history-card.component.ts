import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Card } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SelectButton } from 'primeng/selectbutton';
import { Sensor } from '../../../../models/sensor';
import { SensorAlert } from '../../../../models/sensor-alert';
import { TemperatureLog } from '../../../../models/temperature-log';
import { SensorService } from '../../../../services/sensor.service';

Chart.register(zoomPlugin);

type TimePeriod = '24h' | '7D' | '30D';

@Component({
    selector: 'app-temperature-history-card',
    imports: [Card, SelectButton, FormsModule, ChartModule],
    templateUrl: './temperature-history-card.component.html',
})
export class TemperatureHistoryCardComponent {
    private sensorService = inject(SensorService);

    sensor = input<Sensor | null>(null);
    alert = input<SensorAlert | null>(null);

    selectedPeriod = signal<TimePeriod>('7D');
    temperatureData = signal<TemperatureLog[]>([]);
    loading = signal(false);

    periodOptions: { label: string; value: TimePeriod }[] = [
        { label: '24h', value: '24h' },
        { label: '7D', value: '7D' },
        { label: '30D', value: '30D' },
    ];

    chartData = computed(() => {
        const data = this.temperatureData();
        const alertSettings = this.alert();
        const period = this.selectedPeriod();

        const labels = data.map((d) => this.formatDateTime(d.registeredAt, period));
        const temperatures = data.map((d) => d.value);

        const highThreshold = alertSettings?.maxTemperature;
        const lowThreshold = alertSettings?.minTemperature;

        const datasets: Array<{
            label: string;
            data: (number | null)[];
            fill?: boolean | string;
            borderColor?: string;
            backgroundColor?: string;
            tension?: number;
            borderDash?: number[];
            pointRadius?: number;
        }> = [
                {
                    label: 'Temperature',
                    data: temperatures,
                    fill: true,
                    borderColor: '#cba6f7',
                    backgroundColor: 'rgba(203, 166, 247, 0.2)',
                    tension: 0.4,
                    pointRadius: period === '24h' ? 2 : 0,
                },
            ];

        if (highThreshold != null) {
            datasets.push({
                label: 'High Alert',
                data: Array(labels.length).fill(highThreshold),
                borderColor: '#f38ba8',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
            });
        }

        if (lowThreshold != null) {
            datasets.push({
                label: 'Low Alert',
                data: Array(labels.length).fill(lowThreshold),
                borderColor: '#89b4fa',
                borderDash: [5, 5],
                pointRadius: 0,
                fill: false,
            });
        }

        return { labels, datasets };
    });

    chartOptions = computed(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color') || '#cdd6f4';
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color') || '#a6adc8';
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color') || '#45475a';
        const period = this.selectedPeriod();

        return {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true,
                        },
                        mode: 'x',
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        maxRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: period === '24h' ? 24 : period === '7D' ? 14 : 20,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                        callback: (value: number) => `${value}°C`,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };
    });

    constructor() {
        effect(() => {
            const sensorId = this.sensor()?.id;
            const period = this.selectedPeriod();
            if (sensorId) {
                this.loadTemperatureData(sensorId, period);
            }
        });
    }

    onPeriodChange = (period: TimePeriod): void => {
        this.selectedPeriod.set(period);
    };

    private getDaysFromPeriod = (period: TimePeriod): number => {
        switch (period) {
            case '24h':
                return 1;
            case '7D':
                return 7;
            case '30D':
                return 30;
        }
    };

    private loadTemperatureData = (sensorId: string, period: TimePeriod): void => {
        this.loading.set(true);
        const days = this.getDaysFromPeriod(period);
        this.sensorService.getTemperatureHistory(sensorId, days).subscribe({
            next: (data) => {
                this.temperatureData.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false),
        });
    };

    private formatDateTime = (dateStr: string, period: TimePeriod): string => {
        const date = new Date(dateStr);
        if (period === '24h') {
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }
        if (period === '7D') {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
}
