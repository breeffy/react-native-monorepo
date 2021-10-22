/**
 * Recursively freeze object
 * @param object any object
 * @returns original frozen object
 */
export const deepFreeze = <T extends { [key: string]: any }>(object: T) => {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name];

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(object);
};
