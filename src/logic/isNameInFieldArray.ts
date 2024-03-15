import { InternalFieldName } from '../types';

import getNodeParentName from './getNodeParentName';

export const isNameInFieldArray = (names: Set<InternalFieldName>, name: InternalFieldName) =>
  names.has(getNodeParentName(name));
