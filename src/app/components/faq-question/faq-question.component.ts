import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy, Renderer2, ChangeDetectorRef } from '@angular/core';

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from "rxjs/Subscription";
import { setTimeout } from 'timers';
import { ForceExpand, FAQService } from "../../services/faq-service";



@Component({
    selector: "faq-question",
    styleUrls: ["./faq-question.component.scss"],
    templateUrl: "./faq-question.component.html"
})
export class FAQQuestionComponent {

    @Input()
    question: any;

    @Input()
    search: string;

    private _forceExpand: ForceExpand;
    @Input() 
    set forceExpand(v: ForceExpand) {
        console.log("bro...", v)
        this._forceExpand = v;
        if(v === ForceExpand.Expand) {
            this.openAnswer();
        } else if(v === ForceExpand.Collapse) {
            console.log("collapse you bitch")
            this.closeAnswer();
        }
    }

    get forceExpand(): ForceExpand {
        return this._forceExpand;
    }

    @ViewChild("answerSection")
    answerElement: ElementRef;
    answerHeight: number;

    answerVisible = false;
    expandSub: Subscription;


    constructor(private renderer: Renderer2,
        private cd: ChangeDetectorRef,
        private fs: FAQService) {

    }

    ngOnInit() {
        this.initExpandedSub();
    }

    ngAfterViewInit() {
        this.answerHeight = this.answerElement.nativeElement.offsetHeight;
        if (this.answerVisible) {
            this.openAnswer();
        } else {
            this.closeAnswer();
        }
    }

    ngOnDestroy() {
        if(this.expandSub) {
            this.expandSub.unsubscribe();
        }
    }

    initExpandedSub() {
        this.expandSub = this.fs.forceExpanded.subscribe(expand => {
            if(expand === ForceExpand.Expand) {
                this.openAnswer();
            } else if(expand === ForceExpand.Collapse) {
                this.closeAnswer();
            }
        })
    }

    toggleAnswer() {
        if (this.answerVisible) {
            this.closeAnswer()
        } else {
            this.openAnswer();
        }
    }

    closeAnswer() {
        this.renderer.setStyle(this.answerElement.nativeElement, "maxHeight", "0px");
        this.answerVisible = false;
        this.cd.detectChanges();
    }

    openAnswer() {
        this.renderer.setStyle(this.answerElement.nativeElement, "maxHeight", this.answerHeight + "px");
        this.answerVisible = true;
        this.cd.detectChanges();
    }

    foundMatchInAnswer() {
        this.openAnswer();
    }
}
