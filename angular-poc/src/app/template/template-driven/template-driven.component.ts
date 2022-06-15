import { Component, OnInit } from '@angular/core';
import { IDeactivateComponent } from 'src/app/guards/de_activate_component';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit, IDeactivateComponent {

  product: Product = new Product();
  formSubmitted = false;
  productTypes = ['Laptop', 'Mobile' ];

  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
      console.log("product", this.product);
    this.formSubmitted = true;
  }

  //Check if there any unsaved data etc. If yes then as for confirmation 
  canExit() : boolean {
 
    if (confirm("Do you wish to Please confirm")) {
        return true
      } else {
        return false
      }
    }

}

export class Product {
  public title : string ="";
  public modelName : string = "";
  public color : string = "";
  public productType : string = "";
  public brand : string = "";
  public price : string = "";
}
