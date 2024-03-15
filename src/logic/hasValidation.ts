import { Field } from '../types';

export const hasValidation = (options: Field['_f']) =>
  options.mount &&
  (options.required ||
    options.min ||
    options.max ||
    options.maxLength ||
    options.minLength ||
    options.pattern ||
    options.validate);
