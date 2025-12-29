import { CommonModule } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    Field,
    form,
    submit,
    validateTree,
    ValidationError,
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
import * as z from 'zod';
import { DashboardService, SensorInput } from '../dashboard.service';

export type FieldError = {
    [x: string]: string[];
};

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

    visible = model(false);

    open = () => this.visible.set(true);
    close = () => this.visible.set(false);

    createSensorSchema = z.object({
        name: z
            .string('Name is required.')
            .min(3, 'Too short. Min 3 characters.')
            .max(20, 'Too long. Max 20 characters.'),
        location: z
            .string('Location is required')
            .min(1, 'Location is required')
            .max(200, 'Too long. Max 200 characters.'),
        ip: z.ipv4('Follow the IP pattern of xxx.xxx.xxx.xxx')
            .min(1, 'IP is required')
    });

    private readonly defaultState = {
        name: '',
        location: '',
        ip: '',
    };
    sensorModel = signal<SensorInput>(this.defaultState);
    sensorForm = form(this.sensorModel, (schema) => {
        validateTree(schema, (ctx) => {
            const zodErrors = this.validateForm(ctx.value());

            if (!zodErrors.length) return undefined;

            const errors: ValidationError.WithOptionalField[] = [];

            const getFieldReference = (field: string) => {
                switch (field) {
                    case 'name':
                        return ctx.fieldTree.name;
                    case 'location':
                        return ctx.fieldTree.location;
                    case 'ip':
                        return ctx.fieldTree.ip;
                    default:
                        return undefined;
                }
            };

            zodErrors.forEach(({ field, message }) => {
                const ref = getFieldReference(field);
                if (!ref) return;

                errors.push({
                    kind: `zod.${field}`,
                    fieldTree: ref,
                    message,
                });
            });
            return errors.length ? errors : undefined;
        });
    });

    onSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        this.sensorForm.name().markAsDirty();
        this.sensorForm.location().markAsDirty();
        this.sensorForm.ip().markAsDirty();

        submit(this.sensorForm, async () => {
            const sensor: SensorInput = {
                name: this.sensorModel().name,
                location: this.sensorModel().location,
                ip: this.sensorModel().ip,
            };

            this.dashboardService.addSensor(sensor).subscribe();
            this.sensorModel.set(this.defaultState);
            this.close();
        });
    };

    validateForm = (
        value: SensorInput,
    ): { field: string; message: string }[] => {
        const result = this.createSensorSchema.safeParse(value);
        if (result.success) {
            return [];
        }

        return result.error.issues
            .map((issue) => {
                console.log(issue.path);
                const field = issue.path[0]?.toString();
                if (!field) return null;
                return {
                    field,
                    message: issue.message,
                };
            })
            .filter(
                (error): error is { field: string; message: string } =>
                    error !== null,
            );
    };
}
