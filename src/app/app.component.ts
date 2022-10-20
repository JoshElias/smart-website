import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostBinding
} from '@angular/core';
import { AppState } from './app.service';
import { TopNavService } from "./services";
import { ModalService } from './components/modal/modal.service';
import { Router, NavigationEnd } from "@angular/router"



@Component({
  selector: 'body',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss'],
  template: `
  <top-nav></top-nav>
  <div class="content">
  <router-outlet></router-outlet>
  </div>
  <footer *ngIf="router.url.split('/')[1] !== 'dashboard'"></footer>
  <modal-placeholder></modal-placeholder>
  `
})
export class AppComponent implements OnInit {

  @HostBinding("style.overflow")
  overflow = "visible";

  constructor(
    public router: Router,
    public topNavService: TopNavService,
    private modal: ModalService
  ) {
    this.topNavService.isOpen.subscribe(result => {
      this.overflow = result ? "hidden" : "visible";
    });
    this.modal.active.subscribe(result => {
      this.overflow = result ? "hidden" : "visible";
      console.log("modal overflow", this.overflow);
    });
  }

  public ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}