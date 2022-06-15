import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { AccessGuardService } from '../guards/can_activate_guard';

const NOTIFICATIONS_ROUTES: Routes = [
  {
    path: '',
    component: NotificationComponent, canActivate : [AccessGuardService]
  },
];

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(NOTIFICATIONS_ROUTES)
  ]
})
export class NotificationModule { }
