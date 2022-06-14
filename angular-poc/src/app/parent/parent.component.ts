import { Component, OnInit , ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit , AfterViewInit {

  @ViewChild(ChildComponent) childComponent: ChildComponent | undefined;
  constructor() { 
    console.log("Parent Constructor is called");
  }
  message : string | undefined;
  displayChildMesage: string | undefined = "";

  fontSizepx = 30;

  ngOnInit(): void {
    console.log("Parent Inint is called");
  }

  receiveMessage(msg: string | undefined){
    this.message = msg;
  }

  ngAfterViewInit(): void {
    this.displayChildMesage = this.childComponent?.messageChild;
    
  }

  callPhone(phoneNumber: string){
    alert(phoneNumber);
  }

  onSubmit(){
    console.log(this.profileForm.value);
  }

  profileForm = new FormGroup({
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required)
  })

}
