import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../guards/de_activate_guard';

const routes: Routes = [
  {
    path: '',
    component: TemplateDrivenComponent, canDeactivate: [DeactivateGuard]
  },
];

@NgModule({
  declarations: [
    TemplateDrivenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})

// to work lazy loading , dont import this module in App module
//ng generate module modulea --route a --module app.module
export class TemplateModule { }
