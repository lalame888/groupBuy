import { BusinessHours } from '@/interface';
import { changeWeekToCh } from '@/utils';
import { faPlusCircle, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties, Dispatch, SetStateAction } from 'react';
import { Table, FormCheck } from 'react-bootstrap';
import { IconButton } from '../Button';
import { MyInput } from '../Input';
import { useStoreBusinessTime } from './utils/useStoreBusinessTime';

interface StoreBusinessTimeProps {
  style?: CSSProperties;
  setTimeData: Dispatch<SetStateAction<BusinessHours[]>>;
  time: Array<BusinessHours>;
}
const tdStyle: CSSProperties = {
  textAlign: 'center',
};
export function StoreBusinessTime(props: StoreBusinessTimeProps) {
  const { onIsHolidayChange, onOpenTimeChange, onOpenTimeAdd, showData } =
    useStoreBusinessTime(props.setTimeData, props.time);

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
          {showData.map((data) => {
            const { day, isHoliday, mainTime, otherTime } = data;
            const rowSpan = otherTime.length + 1;
            return (
              <>
                <tr key={day}>
                  <td rowSpan={rowSpan} style={tdStyle}>
                    {changeWeekToCh(day)}
                  </td>
                  <td style={{ display: 'flex' }}>
                    <MyInput
                      disabled={isHoliday}
                      inputValue={mainTime}
                      onChange={(value) => {
                        const openTime = [value, ...otherTime];
                        onOpenTimeChange(day, openTime);
                      }}
                    />
                    <IconButton
                      disabled={
                        isHoliday ||
                        mainTime === '' ||
                        otherTime[otherTime.length - 1] === ''
                      }
                      icon={faPlusCircle}
                      style={{ marginLeft: '10px' }}
                      onClick={() => {
                        onOpenTimeAdd(day);
                      }}
                    />
                  </td>
                  <td rowSpan={rowSpan} style={tdStyle}>
                    <FormCheck
                      checked={isHoliday}
                      onChange={(e) => {
                        onIsHolidayChange(day, e.target.checked);
                      }}
                    />
                  </td>
                </tr>
                {otherTime.map((time, index) => {
                  return (
                    <tr key={`${day}-${index + 1}`}>
                      <td style={{ display: 'flex' }}>
                        <MyInput
                          inputValue={time}
                          onChange={(value) => {
                            const openTime = [mainTime, ...otherTime];
                            openTime[index + 1] = value;
                            onOpenTimeChange(day, openTime);
                          }}
                        />
                        <IconButton
                          icon={faMinus}
                          style={{ marginLeft: '12px' }}
                          onClick={() => {
                            const openTime = [mainTime, ...otherTime];
                            openTime.splice(index + 1, 1);
                            onOpenTimeChange(day, openTime);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
