import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-sibling1',
  templateUrl: './sibling1.component.html',
  styleUrls: ['./sibling1.component.css']
})
export class Sibling1Component implements OnInit {

  user : string =""
  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.user = this.data.getUser();
  }

  senduser() {
    this.data.setuser(this.user);
  }

}
