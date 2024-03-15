import { FieldArrayMethodProps, InternalFieldName } from '../types';
import isUndefined from '../utils/isUndefined';

export const getFocusFieldName = (
  name: InternalFieldName,
  index: number,
  options: FieldArrayMethodProps = {},
): string =>
  options.shouldFocus || isUndefined(options.shouldFocus)
    ? options.focusName ||
      `${name}.${isUndefined(options.focusIndex) ? index : options.focusIndex}.`
    : '';
