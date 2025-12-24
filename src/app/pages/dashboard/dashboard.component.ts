import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { DashboardHeaderComponent } from '../components/dashboard-header.component';

@Component({
    selector: 'button-demo',
    template: `
    <app-dashboard-header></app-dashboard-header>
        `,
    imports: [CommonModule, DashboardHeaderComponent],
})
export class DashboardComponent {}
