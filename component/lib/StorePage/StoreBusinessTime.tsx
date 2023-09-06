import { BusinessHours, WeekDay } from '@/interface';
import { changeWeekToCh } from '@/utils';
import { faPlusCircle, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from 'react';
import { Table, FormCheck } from 'react-bootstrap';
import { IconButton } from '../Button';
import { MyInput } from '../Input';

interface StoreBusinessTimeProps {
  style?: CSSProperties;
  setTimeData(time: Array<BusinessHours>): void;
  time: Array<BusinessHours>;
}
const tdStyle: CSSProperties = {
  textAlign: 'center',
};
export function StoreBusinessTime(props: StoreBusinessTimeProps) {
  function updateBusinessTime(data: BusinessHours) {
    const newTime = [...props.time];
    const index = newTime.findIndex((t) => t.day === data.day);

    if (index !== -1) {
      // 直接更新進去
      newTime[index] = { ...data };
    } else {
      newTime.push(data);
    }
    props.setTimeData(newTime);
  }
  function onIsHolidayChange(
    day: WeekDay,
    checked: boolean,
    propsTime: BusinessHours | undefined,
  ) {
    const openTime = propsTime ? propsTime.openTime : [];
    updateBusinessTime({ day, openTime, isHoliday: checked });
  }
  function onOpenTimeChange(
    day: WeekDay,
    value: Array<string>,
    propsTime: BusinessHours | undefined,
  ) {
    updateBusinessTime({
      day,
      openTime: value,
      isHoliday: propsTime?.isHoliday || false,
    });
  }
  function onOpenTimeAdd(propsTime: BusinessHours | undefined) {
    if (propsTime) {
      const openTime = [...propsTime.openTime, ''];
      updateBusinessTime({ ...propsTime, openTime });
    }
  }
  const style: CSSProperties = {
    ...props.style,
  };
  return (
    <div style={style}>
      <Table responsive="sm">
        <thead>
          <tr>
            <th style={tdStyle}>星期</th>
            <th style={tdStyle}>營業時間 (可選填)</th>
            <th style={tdStyle}>公休</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(Array(7)).map((t, index) => {
            const day = (index + 1) as WeekDay;
            const propsTime = props.time.find((t) => t.day === day);
            const rowSpan = propsTime?.isHoliday
              ? 1
              : propsTime?.openTime.length || 1;
            return (
              <>
                <tr key={day}>
                  <td rowSpan={rowSpan} style={tdStyle}>
                    {changeWeekToCh(day)}
                  </td>
                  <td style={{ display: 'flex' }}>
                    <MyInput
                      disabled={propsTime?.isHoliday}
                      inputValue={
                        propsTime?.isHoliday
                          ? ''
                          : propsTime && propsTime.openTime[0]
                          ? propsTime.openTime[0]
                          : ''
                      }
                      onChange={(value) => {
                        const openTime = propsTime
                          ? [...propsTime.openTime]
                          : [];
                        openTime[0] = value;
                        onOpenTimeChange(day, openTime, propsTime);
                      }}
                    />
                    <IconButton
                      disabled={
                        propsTime?.isHoliday ||
                        propsTime?.openTime[0] === undefined ||
                        propsTime.openTime[propsTime.openTime.length - 1] === ''
                      }
                      icon={faPlusCircle}
                      style={{ marginLeft: '10px' }}
                      onClick={() => {
                        onOpenTimeAdd(propsTime);
                      }}
                    />
                  </td>
                  <td rowSpan={rowSpan} style={tdStyle}>
                    <FormCheck
                      checked={propsTime?.isHoliday || false}
                      onChange={(e) => {
                        onIsHolidayChange(day, e.target.checked, propsTime);
                      }}
                    />
                  </td>
                </tr>
                {rowSpan > 1 && propsTime?.openTime && !propsTime.isHoliday && (
                  <>
                    {propsTime.openTime
                      .slice(1, propsTime.openTime.length)
                      .map((time, index) => {
                        return (
                          <tr key={`${day}-${index + 1}`}>
                            <td style={{ display: 'flex' }}>
                              <MyInput
                                inputValue={time}
                                onChange={(value) => {
                                  const openTime = [...propsTime.openTime];
                                  openTime[index + 1] = value;
                                  onOpenTimeChange(day, openTime, propsTime);
                                }}
                              />
                              <IconButton
                                icon={faMinus}
                                style={{ marginLeft: '12px' }}
                                onClick={() => {
                                  const openTime = [...propsTime.openTime];
                                  openTime.splice(index + 1, 1);
                                  onOpenTimeChange(day, openTime, propsTime);
                                }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
