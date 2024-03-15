export const swap = <T>(data: T[], indexA: number, indexB: number): void => {
  data[indexA] = [data[indexB], (data[indexB] = data[indexA])][0];
};
