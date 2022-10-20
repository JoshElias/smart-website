import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/Rx";


export class ModelCacheChange {
    constructor() { }
}

@Injectable()
export class TopNavService {

    public isOpen = new BehaviorSubject(false);


    toggleNavMenu() {
        let isOpen = this.isOpen.getValue();
        this.isOpen.next(!isOpen);
    }

    closeNavMenu() {
        let isOpen = this.isOpen.getValue();
        if(isOpen) {
            this.isOpen.next(false);
        }
    }
}