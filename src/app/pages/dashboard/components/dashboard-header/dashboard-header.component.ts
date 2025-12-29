import { Component, computed, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { mediaQuery } from '../../../../../utils/media-query';
import { DashboardService } from '../dashboard.service';
import { SensorDialogComponent } from '../sensor-dialog/sensor-dialog.component';

@Component({
    selector: 'app-dashboard-header',
    imports: [Divider, SensorDialogComponent, Button],
    templateUrl: './dashboard-header.component.html',
})
export class DashboardHeaderComponent {
    isSmall = mediaQuery.isSmall;

    dashboardService = inject(DashboardService);

    addSensorModalVisible = signal(false);
    addingSensorLoading = computed(
        () => this.dashboardService.state().addingSensor,
    );
}
