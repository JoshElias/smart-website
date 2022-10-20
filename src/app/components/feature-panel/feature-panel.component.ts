import { Component, Input } from '@angular/core';
import { Feature } from "../../models";



@Component({
    selector: "feature-panel",
    styleUrls: ["./feature-panel.component.scss"],
    templateUrl: "./feature-panel.component.html"
})
export class FeaturePanelComponent {

    @Input()
    feature: Feature;


    constructor() {

    }
}
