import { BusinessHours, WeekDay } from '@/interface';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

export function useStoreBusinessTime(
  setTimeData: Dispatch<SetStateAction<BusinessHours[]>>,
  time: Array<BusinessHours>,
) {
  const updateBusinessTime = useCallback(
    (day: WeekDay, data: Partial<BusinessHours>) => {
      setTimeData((oldTime) => {
        const newTime = [...oldTime];
        const index = newTime.findIndex((t) => t.day === day);

        if (index !== -1) {
          // 直接更新進去
          newTime[index] = { ...newTime[index], ...data };
        } else {
          newTime.push({
            day,
            isHoliday: false,
            openTime: [],
            ...data,
          });
        }
        return newTime;
      });
    },
    [setTimeData],
  );
  const onIsHolidayChange = useCallback(
    (day: WeekDay, checked: boolean) => {
      updateBusinessTime(day, { isHoliday: checked });
    },
    [updateBusinessTime],
  );
  const onOpenTimeChange = useCallback(
    (day: WeekDay, value: Array<string>) => {
      updateBusinessTime(day, { openTime: value });
    },
    [updateBusinessTime],
  );
  const onOpenTimeAdd = useCallback(
    (day: WeekDay) => {
      const data = time.find((t) => t.day === day);
      if (data) {
        const openTime = [...data.openTime, ''];
        updateBusinessTime(day, { openTime });
      }
    },
    [updateBusinessTime, time],
  );

  const showData = useMemo(() => {
    return Array.from(Array(7)).map((t, index) => {
      const day = (index + 1) as WeekDay;
      const propsTime = time.find((t) => t.day === day);
      const isHoliday: boolean = propsTime?.isHoliday || false;
      const openTime = isHoliday ? [] : propsTime?.openTime || [];
      const mainTime: string = openTime[0] || '';
      const otherTime: Array<string> =
        openTime.length > 1 ? openTime.slice(1) : [];
      return {
        day,
        isHoliday,
        mainTime,
        otherTime,
      };
    });
  }, [time]);
  return {
    onIsHolidayChange,
    onOpenTimeChange,
    onOpenTimeAdd,
    showData,
  };
}
