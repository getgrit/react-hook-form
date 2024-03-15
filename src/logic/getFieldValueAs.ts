import { Field, NativeFieldValue } from '../types';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import isString from '../utils/isString';
import isUndefined from '../utils/isUndefined';

export const getFieldValueAs = <T extends NativeFieldValue>(
  value: T,
  { valueAsNumber, valueAsDate, setValueAs }: Field['_f'],
) =>
  isUndefined(value)
    ? value
    : valueAsNumber
    ? value === '' || isNullOrUndefined(value)
      ? NaN
      : +value
    : valueAsDate && isString(value)
    ? new Date(value)
    : setValueAs
    ? setValueAs(value)
    : value;
