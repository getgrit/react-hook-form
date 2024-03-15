import { Message } from './errors';
import { FieldValues, InternalFieldName } from './fields';
import { FieldPath, FieldPathValue } from './path';

export const validator = type ValidationValue = boolean | number | string | RegExp;

export const validator = type ValidationRule<
  TValidationValue extends ValidationValue = ValidationValue,
> = TValidationValue | ValidationValueMessage<TValidationValue>;

export const validator = type ValidationValueMessage<
  TValidationValue extends ValidationValue = ValidationValue,
> = {
  value: TValidationValue;
  message: Message;
}

export const validator = type ValidateResult = Message | Message[] | boolean | undefined;

export const validator = type Validate<TFieldValue> = (
  value: TFieldValue,
) => ValidateResult | Promise<ValidateResult>;

export const validator = type RegisterOptions<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number>;
  minLength: ValidationRule<number>;
  pattern: ValidationRule<RegExp>;
  validate:
    | Validate<FieldPathValue<TFieldValues, TFieldName>>
    | Record<string, Validate<FieldPathValue<TFieldValues, TFieldName>>>;
  valueAsNumber: boolean;
  valueAsDate: boolean;
  value: FieldPathValue<TFieldValues, TFieldName>;
  setValueAs: (value: any) => any;
  shouldUnregister?: boolean;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  disabled: boolean;
  deps: InternalFieldName | InternalFieldName[];
}>;
