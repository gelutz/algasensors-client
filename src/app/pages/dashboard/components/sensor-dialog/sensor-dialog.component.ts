import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    Field,
    form,
    maxLength,
    pattern,
    required,
} from '@angular/forms/signals';
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
import { Message } from 'primeng/message';
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
        Message,
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

    private readonly defaultState = {
        name: '',
        location: '',
        ip: '',
    };
    sensorModel = signal<SensorInput>(this.defaultState);
    sensorForm = form(this.sensorModel, (schema) => {
        required(schema.name, { message: 'Name is required' });
        required(schema.location, { message: 'Location is required' });
        maxLength(schema.ip, 15);
        pattern(schema.ip, /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, {
            message: 'Follow the IP pattern of xxx.xxx.xxx.xxx',
        });
    });

    handleAddSensor = () => {
        if (this.sensorForm().invalid()) return;
        const sensor: SensorInput = {
            name: this.sensorModel().name,
            location: this.sensorModel().location,
            ip: this.sensorModel().ip,
        };

        this.dashboardService.addSensor(sensor).subscribe();
        this.sensorModel.set(this.defaultState);
        this.close();
    };
}
