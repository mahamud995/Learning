import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-parent1',
  templateUrl: './parent1.component.html',
  styleUrls: ['./parent1.component.css']
})
export class Parent1Component implements OnInit, AfterViewInit {
  show = false;
  constructor() { }
  ngAfterViewInit(): void {
    console.log("divelement1 in ngAfterViewInit", this.divElement1);

    this.children?.changes.subscribe((comps: QueryList<ElementRef>) => {
      console.log("====>ngAfterViewInit.changes");
      console.log("divelement1", this.divElement1);
      console.log("divelement2", this.divElement2);
    })
  }

  @ViewChildren("parent") children: QueryList<ElementRef> | undefined;

  @ViewChild("divelement1") divElement1: ElementRef | undefined;

  divElement2: ElementRef | undefined;
  @ViewChild("divelement2")
  set ele2(v: ElementRef) {
    console.log('This element is set when ngIf is true', v);
    this.divElement2 = v;
  }

  ngOnInit(): void {
    console.log("divelement1", this.divElement1);
  }

  showIt() {
    this.show = !this.show;
  }

}
