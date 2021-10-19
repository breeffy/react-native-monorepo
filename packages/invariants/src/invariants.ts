function assertCondition(
  condition: any,
  message: string | undefined = '',
  prefix: string | undefined = ''
): asserts condition {
  if (!condition) {
    throw new Error(`${prefix}${message}`);
  }
}

/**
 * @param condition If it's `falsy` - exception will be thrown, otherwise TypeScript asserts condition. See [Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions).
 * @param message Error message to use if exception will be thrown. Default is `""`.
 * @param prefix Prefix string to use before error message if exception will be thrown. Default is `"[assert] "`.
 */
export function assert(
  condition: any,
  message?: string,
  prefix: string | undefined = '[assert] '
): asserts condition {
  assertCondition(condition, message, prefix);
}

/**
 * @param condition If it's `falsy` - exception will be thrown, otherwise TypeScript asserts condition. See [Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions).
 * @param message Error message to use if exception will be thrown. Default is `""`.
 * @param prefix Prefix string to use before error message if exception will be thrown. Default is `"[invariant] "`.
 */
export function invariant(
  condition: any,
  message?: string,
  prefix: string | undefined = '[invariant] '
): asserts condition {
  assertCondition(condition, message, prefix);
}
