import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Field, form } from '@angular/forms/signals';
import {
    ALargeSmall,
    LucideAngularModule,
    Navigation,
    Rss,
} from 'lucide-angular';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { DashboardService, SensorInput } from '../dashboard.service';

@Component({
    selector: 'app-sensor-dialog',
    imports: [
        CommonModule,
        Dialog,
        FormsModule,
        InputText,
        InputGroup,
        InputGroupAddon,
        Field,
        LucideAngularModule,
        FloatLabel,
        Button,
    ],
    templateUrl: './sensor-dialog.component.html',
})
export class SensorDialogComponent {
    ALargeSmall = ALargeSmall;
    Navigation = Navigation;
    Rss = Rss;

    dashboardService = inject(DashboardService);

    protected visible = signal(false);

    open = () => this.visible.set(true);
    close = () => this.visible.set(false);

    sensorModel = signal<SensorInput>({
        name: '',
        location: '',
        ip: '',
    });
    sensorForm = form(this.sensorModel);

    handleAddSensor = () => {
        const sensor: SensorInput = {
            name: this.sensorForm.name().value(),
            location: this.sensorForm.location().value(),
            ip: this.sensorForm.ip().value(),
        };

        this.dashboardService.sensorAdded$.next(sensor);
        this.close();
    };
}
