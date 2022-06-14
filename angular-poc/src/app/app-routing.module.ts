import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { HelloWorldComponent } from './hello-world.component';
import { Parent2Component } from './interaction/parent2/parent2.component';
import { Sibling1Component } from './interaction/sibling1/sibling1.component';
import { Sibling2Component } from './interaction/sibling2/sibling2.component';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  {
    path: 'sibling1', component : Sibling1Component
  },
  {
    path: 'sibling2', component : Sibling2Component
  },
  {
    path: 'parent2', component : Parent2Component
  },
  {
    path : 'parent-component' , component : ParentComponent
  },
  {
    path : 'child-component' , component : ChildComponent
  },
  {
    path : 'hello-world' , component : HelloWorldComponent
  },
  {
    path : "notification" , 
    loadChildren : () => import("./notifications/notification.module").then(mod => mod.NotificationModule)
  },
  {
    path : '**' , component : HelloWorldComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
