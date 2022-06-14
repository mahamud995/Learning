import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.css']
})
export class Child2Component implements OnInit {

  @Input() childmessage : string ="";
  @Output() messageEvent = new EventEmitter<string>();
  parentmessage : string = "";
  constructor() { }

  ngOnInit(): void {
  }

  sendcMessage(){
    console.log("child emitter", this.parentmessage);
    this.messageEvent.emit(this.parentmessage);
  }

}
