import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideSettings, lucideThermometer, lucideWifi, lucideWifiOff } from '@ng-icons/lucide';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { Sensor } from '../../models/sensor';
import { HlmIconImports } from '../libs/ui/icon/src';
import { SensorSettingsDialog } from '../sensor-settings-dialog/sensor-settings-dialog';

@Component({
  selector: 'app-sensor-card',
  imports: [
    CommonModule,
    HlmCardImports,
    HlmButtonImports,
    HlmIconImports,
    HlmDialogImports,
    BrnDialogImports,
    SensorSettingsDialog,
  ],
  providers: [provideIcons({ lucideSettings, lucideThermometer, lucideWifi, lucideWifiOff })],
  templateUrl: './app-sensor-card.html',
})
export class SensorCard {
  readonly sensor = input.required<Sensor>();

  readonly isAlarming = computed(() => {
    const s = this.sensor();
    if (!s.isOnline) return false;
    if (s.minAlarm !== null && s.temperature < s.minAlarm) return true;
    if (s.maxAlarm !== null && s.temperature > s.maxAlarm) return true;
    return false;
  });

  readonly statusColor = computed(() => {
    if (!this.sensor().isOnline) return 'text-muted-foreground';
    return this.isAlarming() ? 'text-destructive' : 'text-green-600';
  });
}
