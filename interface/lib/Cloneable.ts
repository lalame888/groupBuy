
export class Cloneable<T> {
    public clone(): T {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    public stringify(): string {
      return JSON.stringify(this);
    }
    public toJsonObject():  T {
      return JSON.parse(this.stringify())
    }
  }
  