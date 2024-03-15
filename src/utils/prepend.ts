import convertToArrayPayload from './convertToArrayPayload';

export function prepend<T>(data: T[], value: T | T[]): T[] {
  return [...convertToArrayPayload(value), ...convertToArrayPayload(data)];
}
