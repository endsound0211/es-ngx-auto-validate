import {ErrorMessageMap} from '../error-message-map-token';

export const DefaultErrorMessageMapEnUs: ErrorMessageMap = {
  required: 'Required',
  max: (err) => {return `Max: ${err.max}`;},
  min: (err) => {return `Min: ${err.min}`;},
  maxlength: (err) => {return `Max Length: ${err.actualLength}/${err.requiredLength}`},
  minlength: (err) => {return `Min Length: ${err.actualLength}/${err.requiredLength}`},
  email: 'Invalid Email Format'
};
