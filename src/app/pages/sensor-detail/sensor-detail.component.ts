import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'primeng/breadcrumb';
import { Divider } from 'primeng/divider';
import { switchMap } from 'rxjs';
import { Sensor } from '../../models/sensor';
import { SensorAlert } from '../../models/sensor-alert';
import { SensorService } from '../../services/sensor.service';
import { AlertSettingsCardComponent } from './components/alert-settings-card/alert-settings-card.component';
import { DeviceInfoCardComponent } from './components/device-info-card/device-info-card.component';
import { RecentActivityCardComponent } from './components/recent-activity-card/recent-activity-card.component';
import { TemperatureHistoryCardComponent } from './components/temperature-history-card/temperature-history-card.component';

@Component({
    selector: 'app-sensor-detail',
    imports: [
        Breadcrumb,
        Divider,
        TemperatureHistoryCardComponent,
        AlertSettingsCardComponent,
        RecentActivityCardComponent,
        DeviceInfoCardComponent,
    ],
    templateUrl: './sensor-detail.component.html',
    styles: `
        :host ::ng-deep .p-breadcrumb {
            background: transparent;
            border: none;
            padding: 0.5rem 0;
        }
    `,
})
export class SensorDetailComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private sensorService = inject(SensorService);

    sensor = signal<Sensor | null>(null);
    alert = signal<SensorAlert | null>(null);
    loading = signal(true);

    breadcrumbItems = computed(() => {
        const sensorName = this.sensor()?.name ?? 'Loading...';
        return [
            { label: 'Sensors', routerLink: '/dashboard' },
            { label: sensorName },
        ];
    });

    breadcrumbHome = { icon: 'pi pi-home', routerLink: '/' };

    constructor() {
        this.route.params
            .pipe(
                takeUntilDestroyed(),
                switchMap((params) => {
                    const sensorId = params['id'];
                    return this.sensorService.getSensorDetails(sensorId);
                })
            )
            .subscribe((response) => {
                const sensor: Sensor = {
                    ...response.sensorOutput,
                    ...response.details,
                };
                this.sensor.set(sensor);
                this.loading.set(false);
            });

        this.sensorService.alertUpdated$
            .pipe(takeUntilDestroyed())
            .subscribe((alert) => this.alert.set(alert));

        this.sensorService.alertDeleted$
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.alert.set(null));
    }

    ngOnInit(): void {
        const sensorId = this.route.snapshot.params['id'];
        this.sensorService.getAlert(sensorId).subscribe((alert) => {
            this.alert.set(alert);
        });
    }
}

