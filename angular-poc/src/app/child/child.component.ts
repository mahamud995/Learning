import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LogService } from '../log.service';
import { Pet } from '../pet';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit , OnDestroy {

  @Input() childMessage : string | undefined;

  messageChild : string = "message from child using viewChild";

  imagePath: string = "../../assets/car1.jpeg";

  isDisabled = true;

  
  @Output() messageEvent  = new EventEmitter<string>();

  todaysDate : Date = new Date();

  @Input() size : number = 0;

  @Output() sizeChange = new EventEmitter<number>();

  dec() {
    this.resize(-1);
  }
  inc() {
    this.resize(1);
  }

  resize(delta: number){
    this.size = Math.min(40, Math.max(8,+ this.size + delta));
    this.sizeChange.emit(this.size);
  }


  constructor(private logService : LogService ) { 
    console.log("Child Constructor is called");
  }
  ngOnDestroy(): void {
console.log("Child Destroy is called");
  }

  ngOnInit(): void {
    console.log("Child Inint is called");
    this.logService.logMessage("loading child component");
    this.setCurrentClasses();
    this.setCurrentStyles();
  }



  SendMessage() {
    this.messageEvent.emit("Hello From Child");
  }

  //Attribute Directives
  isSpecial = true;
  currentClasses = {};
  currentStyles = {};
  name = "Mahamud";

  setCurrentClasses() {
    this.currentClasses = {
      saveable : true,
      modified : false,
      special : true
    }
  }
  setCurrentStyles() {
    this.currentStyles ={
      'font-style':'italic',
      'font-weight': 'hold'
    }
  }

  //structural Directives
  isActive = true;

  items =[
    {name : "Mahamud"},
    {name : "Afridi"},
    {name : "Parveen"},
  ]

  item =     {name : "Mahamud"}

  //template driven forms
  species = ["fish","cat","dog"];
  model = new Pet("1","goldie",this.species[0]);
  submitted = false;

  onSubmit(){
    this.submitted = true;
  }

}
