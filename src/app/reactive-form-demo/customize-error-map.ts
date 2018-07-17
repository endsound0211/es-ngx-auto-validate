import {ErrorMessageMap} from '../auto-validate/error-message-map-token';

export const CustomizeErrorMessageMapEnUs: ErrorMessageMap = {
  required: 'Customize Required',
  max: (err) => {return `Customize Max: ${err.max}`;},
  min: (err) => {return `Customize Min: ${err.min}`;},
  maxlength: (err) => {return `Customize Max Length: ${err.actualLength}/${err.requiredLength}`},
  minlength: (err) => {return `Customize Min Length: ${err.actualLength}/${err.requiredLength}`},
  email: 'Customize Invalid Email Format'
};
