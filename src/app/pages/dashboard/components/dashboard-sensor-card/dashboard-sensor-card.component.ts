import { DecimalPipe } from '@angular/common';
import {
    AfterViewInit,
    Component,
    computed,
    DestroyRef,
    effect,
    inject,
    input,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { interval } from 'rxjs';
import {
    EraserIcon,
    LucideAngularModule,
    ThermometerIcon,
} from 'lucide-angular';
import { MenuItem } from 'primeng/api';
import { Badge } from 'primeng/badge';
import { BlockUI } from 'primeng/blockui';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { Menu } from 'primeng/menu';
import { Panel } from 'primeng/panel';
import { Tooltip } from 'primeng/tooltip';
import type { Sensor } from '../../../../models/sensor';
import { SensorAlert } from '../../../../models/sensor-alert';
import { SensorService } from '../../../../services/sensor.service';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-dashboard-sensor-card',
    imports: [
        Button,
        Badge,
        LucideAngularModule,
        Divider,
        Menu,
        BlockUI,
        Panel,
        DecimalPipe,
        RouterLink,
        Tooltip,
    ],
    templateUrl: './dashboard-sensor-card.compoent.html',
})
export class DashboardSensorCardComponent implements AfterViewInit {
    ThermometerIcon = ThermometerIcon;
    EraserIcon = EraserIcon;
    destroyRef = inject(DestroyRef);

    removingLoading = signal(false);

    sensorService = inject(SensorService);
    dashboardService = inject(DashboardService);

    sensor = input.required<Sensor>();
    _sensor = signal<Sensor | undefined>(undefined);
    sensorAlert = signal<SensorAlert | null>(null);

    menuOptions = signal<MenuItem[]>([]);

    barData = signal<(number | null)[]>([]);
    validBarData = computed(() => this.barData().filter((v): v is number => v !== null));
    barMin = computed(() => this.validBarData().length > 0 ? Math.min(...this.validBarData()) : 0);
    barMax = computed(() => this.validBarData().length > 0 ? Math.max(...this.validBarData()) : 0);

    getBarHeight = (value: number | null): number => {
        if (value === null) return 0;
        const min = this.barMin();
        const max = this.barMax();
        const range = max - min;
        if (range === 0) return 50;
        return ((value - min) / range) * 80 + 20;
    };

    getBarTooltip = (value: number | null): string => {
        return value !== null ? `${value.toFixed(1)}°C` : 'No data';
    };

    constructor() {
        effect(() => {
            this._sensor.set(this.sensor());
        });

        effect(() => {
            const sensor = this._sensor();
            if (!sensor) return;

            this.menuOptions.set([
                {
                    label: sensor.enabled ? 'Disable' : 'Enable',
                    icon: 'pi pi-wifi',
                    command: () => this.toggleSensor(),
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => this.deleteSensor(),
                },
            ]);
        });
    }

    ngAfterViewInit(): void {
        this.getSensorDetails();
        this.getDailyMedianTemperatures();
        this.startMedianTemperaturePolling();
        this.getSensorAlert();
    }

    getSensorDetails = () => {
        if (!this.sensor()) return;
        this.sensorService
            .getSensorDetails(this.sensor().id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((response) => {
                this._sensor.update((prev) =>
                    !prev?.id
                        ? prev
                        : {
                            ...prev,
                            lastTemperature: response.details.lastTemperature,
                            updatedAt: response.details.updatedAt,
                        },
                );
            });
    };

    getDailyMedianTemperatures = () => {
        if (!this.sensor()) return;
        this.sensorService
            .getDailyMedianTemperatures(this.sensor().id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((data) => {
                this.barData.set(data.map((d) => d.medianTemperature));
            });
    };

    startMedianTemperaturePolling = (): void => {
        interval(5000)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.getDailyMedianTemperatures());
    };

    getSensorAlert = (): void => {
        if (!this.sensor()) return;
        this.sensorService
            .getAlert(this.sensor().id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((alert) => this.sensorAlert.set(alert));
    };

    deleteSensor = () => {
        this.removingLoading.set(true);
        this.dashboardService
            .deleteSensor(this.sensor().id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.removingLoading.set(false));
    };

    toggleSensor = () => {
        const sensor = this._sensor();
        if (!sensor) return;

        const nextState = !sensor.enabled;
        const id = sensor.id;
        (nextState
            ? this.dashboardService.enableSensor(id)
            : this.dashboardService.disableSensor(id)
        )
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                (ok) =>
                    ok &&
                    this._sensor.update((prev) => {
                        if (!prev?.name) return prev;
                        return {
                            ...prev,
                            id,
                            enabled: nextState,
                        };
                    }),
            );
    };

    disableSensor = () => {
        const id = this._sensor()?.id;
        if (!id) return;
        return this.dashboardService.disableSensor(id);
    };

    enableSensor = () => {
        const id = this._sensor()?.id;
        if (!id) return;
        return this.dashboardService.enableSensor(id);
    };
}
