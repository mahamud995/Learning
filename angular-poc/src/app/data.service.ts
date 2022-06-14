import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  user = new BehaviorSubject<string>("");

  setuser(user: string){
    this.user.next(user)
  }

  getUser(){
    return this.user.getValue();
  }
}
