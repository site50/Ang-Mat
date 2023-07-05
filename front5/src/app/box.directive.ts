import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[appBox]'
})
export class BoxDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.fontWeight = 600;
    }
}