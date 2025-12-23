import { Component, signal } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    primeng = inject(PrimeNG);
    protected readonly title = signal('algasensors-client');

    constructor() {
        this.setTheme();
    }

    setTheme() {
        this.primeng.theme.set({
            primary: '#89b4fa', // accent color
            surface: '#1e1e2e', // base surface
        });
    }
}
