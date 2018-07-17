import {ErrorMessageMap} from '../error-message-map-token';

export const DefaultErrorMessageMapZhTw: ErrorMessageMap = {
  required: '必填',
  max: (err) => {return `最大值${err.max}`;},
  min: (err) => {return `最小值${err.min}`;},
  maxlength: (err) => {return `超出字數：${err.actualLength}/${err.requiredLength}`},
  minlength: (err) => {return `尚缺$${err.requiredLength - err.actualLength}字`},
  email: 'Email格式錯誤'
};
