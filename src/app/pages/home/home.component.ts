import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ButtonModule, CardModule, RouterLink],
    templateUrl: './home.component.html',
})
export class HomeComponent { }
