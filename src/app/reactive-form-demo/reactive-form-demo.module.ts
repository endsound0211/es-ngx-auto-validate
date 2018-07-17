import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormDemoRoutingModule } from './reactive-form-demo-routing.module';
import { ReactiveFormDemoComponent } from './reactive-form-demo.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AutoValidateModule} from '../auto-validate/auto-validate.module';
import {ERROR_MESSAGE_TOKEN} from '../auto-validate/error-message-map-token';
import {DefaultErrorMessageMapEnUs} from '../auto-validate/locale/default-error-message-map-en-us';
import {CustomizeErrorMessageMapEnUs} from './customize-error-map';
import {RENDER_DIV_NODE_STRATEGY} from '../auto-validate/render-div-node-strategy';
import {CustomizeRenderDivNodeStrategy} from './customize-render-div-node-strategy';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormDemoRoutingModule,
    AutoValidateModule,
    ReactiveFormsModule
  ],
  declarations: [ReactiveFormDemoComponent],
  providers: [
    // {provide: ERROR_MESSAGE_TOKEN, useValue: CustomizeErrorMessageMapEnUs},
    // {provide: RENDER_DIV_NODE_STRATEGY, useClass: CustomizeRenderDivNodeStrategy},
    {provide: ERROR_MESSAGE_TOKEN, useValue: DefaultErrorMessageMapEnUs}
  ]
})
export class ReactiveFormDemoModule { }
