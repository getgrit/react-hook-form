import { Ref } from '../types';

import isHTMLElement from './isHTMLElement';

export const live = (ref: Ref) => isHTMLElement(ref) && ref.isConnected;
