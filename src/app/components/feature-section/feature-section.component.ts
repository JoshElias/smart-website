import { Component, Input, OnInit } from '@angular/core';
import { type } from 'os';



@Component({
    selector: "feature-section",
    styleUrls: ["./feature-section.component.scss"],
    templateUrl: "./feature-section.component.html"
})
export class FeatureSectionComponent {

    @Input()
    featureSection: any;

    visibleAnnotations = [];
    activeAnnotation = -1;

    private _activeVersionIndex: number;
    @Input()
    set activeVersionIndex(val: number) {
        this._activeVersionIndex = val;
    }

    get activeVersionIndex() {
        return this._activeVersionIndex;
    }

    checkHTML = '<i class="fa fa-check fa-2x" aria-hidden="true"></i>';
    
    constructor() {
        
    }

    ngOnInit() {
        this.visibleAnnotations = new Array(this.featureSection.features.length);
        for(let i = 0; i < this.visibleAnnotations.length; i++) {
            this.visibleAnnotations[i] = false;
        }
    }

    getValueInHTML(val: any) {

        if(Array.isArray(val)) {
            let result = '<div class="compound-value">';
            for(let i = 0; i < val.length; i++) {
                let value = val[i];
                result += this.parseValue(value);
            }
            result += '</div>'
            return result;
        }

        return this.parseValue(val);
    }

    parseValue(val: any): string {
        if(typeof(val) === "boolean") {
            if(val) return this.checkHTML;
            else return "";
        } else if(!isNaN(val)) {
            return val+"";
        } else if(typeof(val) === "string") {
            return '<span class="value-string">'+val+'</span>';
        }
    }

    getCellHeight(name: string): number {
        if(name.length > 40) {
            return 100;
        } else if(name.length > 28) {
            return 70;
        } else {
            return 40;
        }
    }

    toggleAnnotation(i : number) {
        this.visibleAnnotations[i] = !this.visibleAnnotations[i];
    }

    isAnnotationVisible(i: number) {
        return this.visibleAnnotations[i];
    }

    onOutsideAnnotationClick(i: number) {
        if(this.activeAnnotation === i) {
            return;
        }
        this.visibleAnnotations[i] = false;
    }
}
