import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent2',
  templateUrl: './parent2.component.html',
  styleUrls: ['./parent2.component.css']
})
export class Parent2Component implements OnInit {
  parentmessage = "";
  childmessage = "";
  message= "";
  constructor() { }

  ngOnInit(): void {
  }

  sendpMessage(){
    this.childmessage = this.message;
  }

  receivemessage($event: any){
    console.log("event", $event);
    this.parentmessage = $event;
  }
}
