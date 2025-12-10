import { Component, inject } from '@angular/core';
import { SensorCard } from '../../components/sensor-card/app-sensor-card';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'app-home',
  imports: [SensorCard],
  templateUrl: './home-component.html',
})
export class HomeComponent {
  private readonly _sensorService = inject(SensorService);
  readonly sensors = this._sensorService.sensors;
}
