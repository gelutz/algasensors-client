import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor.service';

@Component({
    selector: 'app-sensor-settings-dialog',
    imports: [
        ReactiveFormsModule,
        HlmDialogImports,
        HlmButtonImports,
        HlmInputImports,
        HlmLabelImports,
    ],
    templateUrl: './sensor-settings-dialog.html',
})
export class SensorSettingsDialog {
    private readonly _fb = inject(FormBuilder);
    private readonly _sensorService = inject(SensorService);
    // Injected by BrnDialog when used as content
    private readonly _dialogRef = inject(BrnDialogRef, { optional: true });

    // We'll pass the sensor data via the dialog context or input if used differently
    // But for *brnDialogContent, we usually access context.
    // Let's assume we pass the sensor as an input to this component if we use it inside the dialog content wrapper
    // OR we can just use it as a standalone component inside the dialog.

    readonly sensor = input.required<Sensor>();

    readonly form = this._fb.group({
        minAlarm: [null as number | null],
        maxAlarm: [null as number | null],
    });

    ngOnInit() {
        const s = this.sensor();
        this.form.patchValue({
            minAlarm: s.minAlarm,
            maxAlarm: s.maxAlarm,
        });
    }

    save() {
        if (this.form.valid) {
            const { minAlarm, maxAlarm } = this.form.value;
            this._sensorService.updateSensor(this.sensor().id, {
                minAlarm: minAlarm ?? null,
                maxAlarm: maxAlarm ?? null,
            });
            this._dialogRef?.close();
        }
    }

    cancel() {
        this._dialogRef?.close();
    }
}
