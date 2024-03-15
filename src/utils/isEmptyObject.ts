import { EmptyObject } from '../types';

import isObject from './isObject';

export const isEmptyObject = (value: unknown): value is EmptyObject =>
  isObject(value) && !Object.keys(value).length;
