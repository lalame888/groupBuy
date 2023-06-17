
export class Cloneable {
    public clone() {
      return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
  }
  