import { Component, computed, inject } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import type { MenuItem } from "primeng/api";
import { Button } from "primeng/button";
import { DividerModule } from "primeng/divider";
import { Menubar } from "primeng/menubar";
import { Subject } from "rxjs";

@Component({
	selector: "app-layout",
	imports: [RouterOutlet, Menubar, DividerModule, Button],
	templateUrl: "./layout.component.html",
})
export class LayoutComponent {
	router = inject(Router);

	toggleTheme$ = new Subject<void>();
	isThemeDark = computed(() =>
		document.querySelector("html")?.classList.contains("app-dark"),
	);

	items: MenuItem[] = [
		// { label: "Home", icon: "pi pi-home", routerLink: ["/"] },
		{
			label: "Dashboard",
			icon: "pi pi-objects-column",
			routerLink: ["/dashboard"],
		},
	];

	constructor() {
		this.toggleTheme$.subscribe(() => {
			const element = document.querySelector("html");
			element?.classList.toggle("app-dark");
		});
	}

	toggleTheme = () => {
		this.toggleTheme$.next();
	};
}
