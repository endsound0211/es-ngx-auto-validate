import {InjectionToken} from '@angular/core';


export const ERROR_MESSAGE_TOKEN = new InjectionToken<ErrorMessageMap>('ErrorMessageMap');

export interface ErrorMessageMap {
  [key: string]: string | Function;
}
