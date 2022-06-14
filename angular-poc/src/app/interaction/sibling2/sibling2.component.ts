import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-sibling2',
  templateUrl: './sibling2.component.html',
  styleUrls: ['./sibling2.component.css']
})
export class Sibling2Component implements OnInit {
  user : string =""
  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.user = this.data.getUser();
  }

  senduser() {
    this.data.setuser(this.user);
  }


}
