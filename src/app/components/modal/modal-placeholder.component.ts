import { Component, OnInit, ViewChild, ViewContainerRef, Injector } from "@angular/core";
import { ModalService } from "./modal.service";

@Component({
    selector: "modal-placeholder",
    styleUrls: [ "./modal.component.scss" ],
    template: `<div #modalPlaceholder></div>`
})
export class ModalPlaceholderComponent implements OnInit {
    @ViewChild("modalPlaceholder", {read: ViewContainerRef})
    viewContainerRef: ViewContainerRef;

    constructor(private modalService: ModalService,
                private injector: Injector) {

    }

    ngOnInit(): void {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}