import { Component , OnInit, OnDestroy } from "@angular/core";


@Component({
    selector : "app-hello-world",
    template: "<h1>{{title}}</h1>",
    styles: [`h1 {
        color : blue;
    }`]
})

export class HelloWorldComponent implements OnInit , OnDestroy  {
    intervalSub: any;
    ngOnInit(): void {
        this.intervalSub = setInterval(() => {
            console.log("logging");
        }, 1000)
    }

    title = "Hello World"

    ngOnDestroy(): void {
        if(this.intervalSub){
            clearInterval(this.intervalSub);
        }
    }
}


