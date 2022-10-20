import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import fullSmartLogo from "../../../assets/img/smart_logo_full.png";
import { TopNavService } from "../../services";


@Component({
  selector: "top-nav",
  styleUrls: [ "./top-nav.component.scss" ],
  templateUrl: "./top-nav.component.html"
})
export class TopNavComponent {

  fullSmartLogo = fullSmartLogo;

  navMenuSub: Subscription;
  navMenuDisplay = "none";

  constructor(
    public topNavService: TopNavService,
    private router: Router
  ) {
    this.navMenuSub = this.topNavService.isOpen.subscribe(result => {
      this.navMenuDisplay = (result) ? "grid" : "none";
    })
     
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.navMenuSub) {
      this.navMenuSub.unsubscribe();
    }
  }

  navigate(route: string) {
    let that = this;
    this.router.navigate([route])
      .then(() => {
        that.topNavService.closeNavMenu();
      })
  }
}
