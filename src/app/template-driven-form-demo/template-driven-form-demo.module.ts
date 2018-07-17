import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateDrivenFormDemoRoutingModule } from './template-driven-form-demo-routing.module';
import { TemplateDrivenFormDemoComponent } from './template-driven-form-demo.component';
import {AutoValidateModule} from '../auto-validate/auto-validate.module';
import {FormsModule} from '@angular/forms';
import {ERROR_MESSAGE_TOKEN} from '../auto-validate/error-message-map-token';
import {DefaultErrorMessageMapEnUs} from '../auto-validate/locale/default-error-message-map-en-us';

@NgModule({
  imports: [
    CommonModule,
    TemplateDrivenFormDemoRoutingModule,
    AutoValidateModule,
    FormsModule
  ],
  declarations: [TemplateDrivenFormDemoComponent],
  providers: [
    {provide: ERROR_MESSAGE_TOKEN, useValue: DefaultErrorMessageMapEnUs}
  ]
})
export class TemplateDrivenFormDemoModule { }
