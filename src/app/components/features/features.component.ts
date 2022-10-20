import { Component, OnInit, OnChanges } from "@angular/core";
import { FAQService } from "../../services";

import featuresSplash from "../../../assets/img/features_splash.jpg";
import feature1 from "../../../assets/img/feature_1.jpg";
import feature2 from "../../../assets/img/feature_2.jpg";
import feature3 from "../../../assets/img/feature_3.jpg";
import feature4 from "../../../assets/img/feature_4.jpg";
import feature6 from "../../../assets/img/feature_6.jpg";




@Component({
    selector: "features",
    styleUrls: [ "./features.component.scss" ],
    templateUrl: "./features.component.html"
})
export class FeaturesComponent {


    featuresSplash = featuresSplash;
    feature1 = feature1;
    feature2 = feature2;
    feature3 = feature3;
    feature4 = feature4;
    feature6 = feature6;


    getBackgroundImageCSS(url) {
        return `url(${url})`;
    }

}