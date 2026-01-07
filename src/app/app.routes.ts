import type { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { HomeComponent } from "./pages/home/home.component";
import { LayoutComponent } from "./pages/layout/layout.component";
import { SensorDetailComponent } from "./pages/sensor-detail/sensor-detail.component";

export const routes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [
			{
				path: "",
				component: HomeComponent,
			},
			{
				path: "dashboard",
				component: DashboardComponent,
			},
			{
				path: "sensor/:id",
				component: SensorDetailComponent,
			},
		],
	},
];
