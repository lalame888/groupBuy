export function getKeyByValue(type: any ,value: string | number) {
    const indexOfS = Object.values(type).indexOf(value);
    const key = Object.keys(type)[indexOfS];
    return key;
  }