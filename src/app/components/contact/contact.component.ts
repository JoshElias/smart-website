import { Component } from "@angular/core";

import contactSplash from "../../../assets/img/contact_splash.jpg";



@Component({
    selector: "contact",
    styleUrls: [ "./contact.component.scss" ],
    templateUrl: "./contact.component.html"
})
export class ContactComponent {

    contactSplash = contactSplash;

}