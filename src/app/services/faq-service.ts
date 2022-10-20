import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs/Rx";


export enum ForceExpand {
    None,
    Expand,
    Collapse
}

@Injectable()
export class FAQService {

    public forceExpanded = new EventEmitter<ForceExpand>();


    expandFAQ() {
        this.forceExpanded.next(ForceExpand.Expand);
    }

    collapseFAQ() {
        this.forceExpanded.next(ForceExpand.Collapse);
    }
}