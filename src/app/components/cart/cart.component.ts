import { Component, OnInit, AfterViewInit, HostListener, ViewEncapsulation, ViewChild,
    QueryList, ElementRef, ViewChildren, ViewContainerRef } from '@angular/core';
    import { DomSanitizer } from '@angular/platform-browser';
  import { BehaviorSubject } from "rxjs/BehaviorSubject";
  import { Router } from "@angular/router";
  
  import { Modal } from '../modal/modal.decorator';
  
  
  @Component({
    selector: "cart",
    styleUrls: [ "./cart.component.scss" ],
    templateUrl: "cart.component.html"
  })
  @Modal()
  export class CartComponent {
  
    ok: Function;
    purchaseLink: string;
    value: string;
  
    destroy: Function;
    closeModal: Function;
  
    contentHeight;
  
  
    constructor(private sanitizer: DomSanitizer) {          
    }
  
  
  
    onCancel(event) {
      this.destroy();
      this.ok(false);
    }
  
    onOk(event) {
      this.destroy();
      this.ok(true);
    }
  
  
    // Close Modal on outside click
    @HostListener('click', ['$event.target'])
    onClick(btn) {
        console.log("outside CLICK")
      this.closeModal();
    }
  
    onModalClick(event) {
      event.stopPropagation();
    }

    getCartLink() {
        console.log("getting url")
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.purchaseLink);
    }
  }
  