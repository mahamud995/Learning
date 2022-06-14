import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, from, fromEvent, Observable, Observer, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  person : any = {
    name : "Mahamud",
    age : 26
  }

  constructor(private el: ElementRef , private router: Router){

  }
  ngOnInit(): void {
    // 1. create an observable


  const nameObservable : Observable<any> = of(this.person);

  nameObservable.subscribe(x => console.log(x));

  const personPromise : Promise<any> = Promise.resolve(this.person);
  const personObs : Observable<any> = from(personPromise);

  personObs.subscribe(x => console.log("from", x));



  let observable1 = new Observable((observer : any) =>{
    observer.next('A')
      observer.next('B')
      observer.error('Error occured.')
      observer.complete('Data stream is over.')
      observer.next('C')
  });
  
  //2. subscription

  observable1.subscribe(value => console.log(value));

  //normalSubject
    this.normalSubject();
    this.behaviourSubject();
    this.replaySubject();
    this.asyncSubject();
  }

  observer : Observer<any> = {
    next : (value) => console.log(value),
    error : (error) => console.log(error),
    complete : () => console.log("completed")
  }

  observable = new Observable((obs : Observer<any>) =>{
      obs.next("Hello World"),
      obs.complete(),
      obs.error("hello error")
  }).subscribe(this.observer);

  ngAfterViewInit(): void {
    this.buttonClick();
  }
  title = 'angular-poc';

  buttonSubscription : Subscription | undefined;

  @ViewChild('buttonClick') button : ElementRef | undefined;

  buttonClick(){
    if(this.button){
      this.buttonSubscription = fromEvent(this.button.nativeElement,'click').subscribe(() =>{
        this.observer,
        this.router.navigate(['/hello-world'])
      }
      )      
    }
  }

  ngOnDestroy(): void {
    this.buttonSubscription?.unsubscribe()
  }

  //subject
 
  normalSubject(){
   const subject = new Subject<number>();

   subject.pipe(map(x => x*2)).subscribe(x => console.log("befor" +x));
   subject.next(3);
   subject.pipe(map(x => x-2)).subscribe(x => console.log(x));
   subject.next(5);
  }

  behaviourSubject(){
    const behaviorSubject = new BehaviorSubject<number>(1);
 
    behaviorSubject.pipe(map(x => x*2)).subscribe(x => console.log("behaviour 1 " ,x));
    behaviorSubject.next(3);
    behaviorSubject.pipe(map(x => x-2)).subscribe(x => console.log("behaviour 2 ",x));
    behaviorSubject.next(5);
   }

   replaySubject(){
    const replaySubject = new ReplaySubject<number>(2);
    replaySubject.next(100);
    replaySubject.next(12);
    replaySubject.next(55); 
    replaySubject.pipe(map(x => x*2)).subscribe(x => console.log("replaySubject 1 " ,x));
    replaySubject.pipe(map(x => x-2)).subscribe(x => console.log("replaySubject 2 ",x));

   }

   asyncSubject(){
    const asyncSubject = new AsyncSubject<number>();
    asyncSubject.pipe(map(x => x*2)).subscribe(x => console.log("asyncSubject 1 " ,x));
    asyncSubject.pipe(map(x => x-2)).subscribe(x => console.log("asyncSubject 2 ",x));
    asyncSubject.next(60);
    asyncSubject.next(82);
    asyncSubject.complete();
    asyncSubject.next(25); 
    
   }


  
}
