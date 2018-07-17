import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoValidateDirective } from './auto-validate.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AutoValidateDirective],
  exports: [AutoValidateDirective]
})
export class AutoValidateModule { }
