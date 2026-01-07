import { Component, computed, input } from '@angular/core';
import { Card } from 'primeng/card';
import { Sensor } from '../../../../models/sensor';

@Component({
    selector: 'app-device-info-card',
    imports: [Card],
    templateUrl: './device-info-card.component.html',
})
export class DeviceInfoCardComponent {
    sensor = input<Sensor | null>(null);

    deviceInfo = computed(() => {
        const s = this.sensor();
        return [
            { label: 'TSID', value: s?.id?.substring(0, 17) ?? '--' },
            { label: 'Model', value: s?.model ?? 'Unknown' },
            { label: 'Protocol', value: s?.protocol ?? 'Unknown' },
            { label: 'Location', value: s?.location ?? '--' },
        ];
    });
}

