import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../guards/de_activate_guard';
import { ReactiveComponent } from './reactive.component';

const routes: Routes = [{ path: '', component: ReactiveComponent , canDeactivate :[DeactivateGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveRoutingModule { }
