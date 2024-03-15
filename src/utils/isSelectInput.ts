import { FieldElement } from '../types';

export const isSelectInput = (element: FieldElement): element is HTMLSelectElement =>
  element.type === 'select-one';
