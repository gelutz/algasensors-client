import { Component } from '@angular/core';
import { SensorCard } from "../../components/sensor-card/app-sensor-card";

@Component({
  selector: 'app-home-component',
  imports: [SensorCard],
  templateUrl: './home-component.html',
})
export class HomeComponent {

}
