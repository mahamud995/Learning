import { Directive , ElementRef , HostListener, Input } from "@angular/core"

@Directive({
    selector : '[appHighlight]'
})

export class HighlightDirective {

    @Input() appHighlight : string = "";

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.appHighlight);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight('yellow');
    }

    //Element Ref grants direct access to the host DOM element through its native element Property and Element Ref in directive constructor to inject the reference to host DOM element
    // the element to which you apply app highlight
    constructor(private el : ElementRef){
           el.nativeElement.style.backgroundColor = "yellow"; 
    }

    highlight(color: string){
        this.el.nativeElement.style.backgroundColor = color; 
    }
}