import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { providePrimeNG } from "primeng/config";
import { CatppuccinPreset } from "../utils/catppuccin-theme";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		providePrimeNG({
			theme: {
				preset: CatppuccinPreset,
				options: {
					darkModeSelector: ".app-dark", // This class toggles dark mode
				},
			},
		}),
	],
};
