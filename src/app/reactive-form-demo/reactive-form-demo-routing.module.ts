import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormDemoComponent} from './reactive-form-demo.component';

const routes: Routes = [
  {path: '', component: ReactiveFormDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveFormDemoRoutingModule { }
