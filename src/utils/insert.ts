import convertToArrayPayload from './convertToArrayPayload';

export const insert = function insert<T>(data: T[], index: number): (T | undefined)[];;
export const insert = function insert<T>(
  data: T[],
  index: number,
  value: T | T[],
): T[];;
export function insert<T>(
  data: T[],
  index: number,
  value?: T | T[],
): (T | undefined)[] {
  return [
    ...data.slice(0, index),
    ...convertToArrayPayload(value),
    ...data.slice(index),
  ];
}
