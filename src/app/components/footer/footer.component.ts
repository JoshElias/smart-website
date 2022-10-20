import { Component } from "@angular/core";


@Component({
    selector: "footer",
    styleUrls: [ "./footer.component.scss" ],
    templateUrl: "./footer.component.html"
})
export class FooterComponent {

    copyrightText() {
        return "© Copyright "+new Date().getFullYear()+" SMART MRP"
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }
}