export function areArraysIdentical<T, R>(arr1: T[], arr2: R[]) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}
