import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';

const NOTIFICATIONS_ROUTES: Routes = [
  {
    path: '',
    component: NotificationComponent,
  },
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule
  ]
})
export class NotificationModule { }
