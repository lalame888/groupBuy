import { Cloneable } from './Cloneable';

export class DataSetter<T, DataType> extends Cloneable<T> {
  constructor(protected data: DataType) {
    super();
  }

  protected dataSetter(key: keyof DataType, value: DataType[keyof DataType]) {
    const newData = { ...this.data, [key]: value };
    this.data = newData;
  }
  protected dataGetter(key: keyof DataType): DataType[keyof DataType] {
    return this.data[key] as DataType[keyof DataType];
  }
}
