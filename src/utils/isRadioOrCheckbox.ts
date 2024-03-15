import { FieldElement } from '../types';

import isCheckBoxInput from './isCheckBoxInput';
import isRadioInput from './isRadioInput';

export const isRadioOrCheckbox = (ref: FieldElement): ref is HTMLInputElement =>
  isRadioInput(ref) || isCheckBoxInput(ref);
