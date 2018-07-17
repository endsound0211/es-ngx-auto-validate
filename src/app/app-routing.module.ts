import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'reactive', loadChildren: 'src/app/reactive-form-demo/reactive-form-demo.module#ReactiveFormDemoModule'},
  {path: 'template', loadChildren: 'src/app/template-driven-form-demo/template-driven-form-demo.module#TemplateDrivenFormDemoModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
