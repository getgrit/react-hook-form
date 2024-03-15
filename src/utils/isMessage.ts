import React from 'react';

import { Message } from '../types';
import isString from '../utils/isString';

export const isMessage = (value: unknown): value is Message =>
  isString(value) || React.isValidElement(value as JSX.Element);
