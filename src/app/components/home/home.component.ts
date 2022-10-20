import { Component } from '@angular/core';

import { Feature } from "../../models";

import basicSmartLogo from "../../../assets/img/smart_logo_basic.png"
import faqIcon from "../../../assets/img/faq_icon.png";
import getStartedIcon from "../../../assets/img/get_started_icon.png";
import productsIcon from "../../../assets/img/products_icon.png";

@Component({
  selector: "home",  // <home></home>
  styleUrls: ["./home.component.scss"],
  templateUrl: "./home.component.html"
})
export class HomeComponent {

  basicSmartLogo = basicSmartLogo;
  faqIcon = faqIcon;
  getStartedIcon = getStartedIcon;
  productsIcon = productsIcon;


  constructor() {
  }



  features: Feature[] = [
    new Feature(
      "What Can SMART Do For You?", 
      "SMART is the next step for your business.",
      "Features",
      "/features",
      getStartedIcon
    ),
    new Feature(
      "Find The Perfect Solution!", 
      "Compare features to suit your needs.",
      "Pricing",
      "/pricing",
      productsIcon
    ),
    new Feature(
      "Have Any Questions?", 
      "View frequently asked questions.",
      "FAQ",
      "/faq",
      faqIcon
    ),
  ]
}
