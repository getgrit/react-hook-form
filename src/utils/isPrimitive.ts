import { Primitive } from '../types';

import isNullOrUndefined from './isNullOrUndefined';
import { isObjectType } from './isObject';

export const isPrimitive = (value: unknown): value is Primitive =>
  isNullOrUndefined(value) || !isObjectType(value);
