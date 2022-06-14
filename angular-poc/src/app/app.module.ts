import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './hello-world.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { GeneratePipePipe } from './generate-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightDirective } from './highlight.directive';
import { LogService } from './log.service';
import { Parent1Component } from './viewchild/parent1/parent1.component';
import { Parent2Component } from './interaction/parent2/parent2.component';
import { Child2Component } from './interaction/child2/child2.component';
import { Sibling1Component } from './interaction/sibling1/sibling1.component';
import { Sibling2Component } from './interaction/sibling2/sibling2.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    ParentComponent,
    ChildComponent,
    GeneratePipePipe,
    HighlightDirective,
    Parent1Component,
    Parent2Component,
    Child2Component,
    Sibling1Component,
    Sibling2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
