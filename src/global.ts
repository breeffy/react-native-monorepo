declare global {
  interface Object {
    hasOwnProperty<K extends string>(v: K): this is Record<K, any>;
  }

  interface ArrayConstructor {
    isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>;
  }
}

export default global;
