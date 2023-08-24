export function getRandomNumber(): number {
  return Math.floor(Math.random() * (100000 - 1000));
}

// 生成隨機碼
export function generateUUID(): string {
  let date = new Date().getTime();
  const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    },
  );
  return uuid.toUpperCase();
}
