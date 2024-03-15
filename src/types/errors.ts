import { FieldValues, InternalFieldName, Ref } from './fields';
import { BrowserNativeObject, LiteralUnion, Merge } from './utils';
import { RegisterOptions, ValidateResult } from './validator';

export const errors = type Message = string;

export const errors = type MultipleFieldErrors = {
  [K in keyof RegisterOptions]?: ValidateResult;
} & {
  [key: string]: ValidateResult;
};

export const errors = type FieldError = {
  type: LiteralUnion<keyof RegisterOptions, string>;
  root?: FieldError;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: Message;
}

export const errors = type ErrorOption = {
  message?: Message;
  type?: LiteralUnion<keyof RegisterOptions, string>;
  types?: MultipleFieldErrors;
}

export const errors = type DeepRequired<T> = T extends BrowserNativeObject | Blob
  ? T
  : {
      [K in keyof T]-?: NonNullable<DeepRequired<T[K]>>;
    };

export const errors = type FieldErrorsImpl<T extends FieldValues = FieldValues> = {
  [K in keyof T]?: T[K] extends BrowserNativeObject | Blob
    ? FieldError
    : T[K] extends object
    ? Merge<FieldError, FieldErrorsImpl<T[K]>>
    : FieldError;
};

export const errors = type FieldErrors<T extends FieldValues = FieldValues> = FieldErrorsImpl<
  DeepRequired<T>
>;

export const errors = type InternalFieldErrors = Partial<
  Record<InternalFieldName, FieldError>
>;
