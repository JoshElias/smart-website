import { Directive, ElementRef, Renderer, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Directive({
  selector: '[colorSearchedLetters]'
})
export class ColorSearchedLettersDirective implements OnInit {

  @Input() 
  search: string;
  @Input() 
  text: string;
  @Input() 
  classToApply: string;

  @Output() 
  foundMatch: EventEmitter<any> = new EventEmitter<any>();

  matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;


  constructor(private el: ElementRef, private renderer: Renderer) { }


  ngOnInit() {

    if (typeof this.classToApply === 'undefined') {
      this.classToApply = '';
    }

    if (typeof this.search === 'undefined') {
      this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.text);
      return;
    }

    let search = this.escapeStringRegexp(this.search.toString());
    this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', this.replace(this.text, search));
  }

  replace(txt: string, search: string) {
    if(!search || search.trim().length < 2) {
      return txt;
    }
    let searchRgx = new RegExp('('+search+')', 'gi');
    
    this.foundMatch.emit();
    return txt.replace(searchRgx, `<span class="${this.classToApply}">$1</span>`);
  }

  escapeStringRegexp (str) {
    if (typeof str !== 'string') {
      throw new TypeError('Expected a string');
    }
  
    return str.replace(this.matchOperatorsRe, '\\$&');
  };
}