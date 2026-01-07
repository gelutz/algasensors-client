import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputNumber } from 'primeng/inputnumber';
import { Sensor } from '../../../../models/sensor';
import { SensorAlert, SensorAlertInput } from '../../../../models/sensor-alert';
import { SensorService } from '../../../../services/sensor.service';

@Component({
    selector: 'app-alert-settings-card',
    imports: [Card, InputNumber, InputGroup, InputGroupAddon, Button, FormsModule],
    templateUrl: './alert-settings-card.component.html',
})
export class AlertSettingsCardComponent {
    private sensorService = inject(SensorService);

    sensor = input<Sensor | null>(null);
    alert = input<SensorAlert | null>(null);

    maxTemperature = signal<number | null>(null);
    minTemperature = signal<number | null>(null);

    saving = signal(false);

    hasChanges = computed(() => {
        const currentAlert = this.alert();
        return (
            this.maxTemperature() !== (currentAlert?.maxTemperature ?? null) ||
            this.minTemperature() !== (currentAlert?.minTemperature ?? null)
        );
    });

    isNewAlert = computed(() => this.alert() === null);

    constructor() {
        effect(() => {
            const alertData = this.alert();
            if (alertData) {
                this.maxTemperature.set(alertData.maxTemperature);
                this.minTemperature.set(alertData.minTemperature);
            } else {
                this.maxTemperature.set(null);
                this.minTemperature.set(null);
            }
        });
    }

    onSave = (): void => {
        const sensorId = this.sensor()?.id;
        if (!sensorId) return;

        const input: SensorAlertInput = {
            maxTemperature: this.maxTemperature(),
            minTemperature: this.minTemperature(),
        };

        this.saving.set(true);

        this.sensorService.saveAlert(sensorId, input).subscribe({
            next: (alert) => {
                this.sensorService.alertUpdated$.next(alert);
                this.saving.set(false);
            },
            error: () => this.saving.set(false),
        });
    };

    onDiscard = (): void => {
        const alertData = this.alert();
        this.maxTemperature.set(alertData?.maxTemperature ?? null);
        this.minTemperature.set(alertData?.minTemperature ?? null);
    };
}

