
export class Cloneable<T> {
    public clone(): T {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
  }
  