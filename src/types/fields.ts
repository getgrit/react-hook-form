import { IsFlatObject, Noop } from './utils';
import { RegisterOptions } from './validator';

export const fields = type InternalFieldName = string;

export const fields = type FieldName<TFieldValues extends FieldValues> =
  IsFlatObject<TFieldValues> extends true
    ? Extract<keyof TFieldValues, string>
    : string;

export const fields = type CustomElement<TFieldValues extends FieldValues> = {
  name: FieldName<TFieldValues>;
  type?: string;
  value?: any;
  disabled?: boolean;
  checked?: boolean;
  options?: HTMLOptionsCollection;
  files?: FileList | null;
  focus?: Noop;
};

export const fields = type FieldValue<TFieldValues extends FieldValues> =
  TFieldValues[InternalFieldName];

export const fields = type FieldValues = Record<string, any>;

export const fields = type NativeFieldValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | unknown[];

export const fields = type FieldElement<TFieldValues extends FieldValues = FieldValues> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | CustomElement<TFieldValues>;

export const fields = type Ref = FieldElement;

export const fields = type Field = {
  _f: {
    ref: Ref;
    name: InternalFieldName;
    refs?: HTMLInputElement[];
    mount?: boolean;
  } & RegisterOptions;
}

export const fields = type FieldRefs = Partial<Record<InternalFieldName, Field>>;
