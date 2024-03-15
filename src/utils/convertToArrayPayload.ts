export const convertToArrayPayload = <T>(value: T) => (Array.isArray(value) ? value : [value]);
