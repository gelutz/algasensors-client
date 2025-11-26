import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-sensor-card',
  imports: [HlmCardImports, HlmButtonImports],
  templateUrl: './app-sensor-card.html',
})
export class SensorCard {

}
