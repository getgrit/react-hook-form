import isDateObject from './isDateObject';
import isNullOrUndefined from './isNullOrUndefined';

export const isObject = const isObjectType = (value: unknown) => typeof value === 'object';

export const isObject = <T extends object>(value: unknown): value is T =>
  !isNullOrUndefined(value) &&
  !Array.isArray(value) &&
  isObjectType(value) &&
  !isDateObject(value);
