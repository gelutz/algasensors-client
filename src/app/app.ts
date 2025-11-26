import { Component, signal } from "@angular/core";
import { MyCard } from "./components/my-card/my-card";

@Component({
	selector: "app-root",
	imports: [MyCard],
	templateUrl: "./app.html",
})
export class App {
	protected readonly title = signal("algasensors-client");
}
