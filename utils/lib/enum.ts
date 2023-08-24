export function getKeyByValue(type: any, value: string | number) {
  const indexOfS = Object.values(type).indexOf(value);
  const key = Object.keys(type)[indexOfS];
  return key;
}

export function changeWeekToCh(week: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
  switch (week) {
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    case 7:
      return '星期日';
  }
}
