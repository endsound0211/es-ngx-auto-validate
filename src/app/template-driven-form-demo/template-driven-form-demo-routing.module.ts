import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TemplateDrivenFormDemoComponent} from './template-driven-form-demo.component';

const routes: Routes = [
  {path: '', component: TemplateDrivenFormDemoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateDrivenFormDemoRoutingModule { }
