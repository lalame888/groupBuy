import { MyHoverButton, StoreCoverImage, ListCard } from '@/component';
import { GroupBuyObject } from '@/interface';
import { CSSProperties } from 'react';

interface GroupBuyListCardProps {
  groupBuyObject: GroupBuyObject;
  style?: CSSProperties;
}

export function GroupBuyListCard(props: GroupBuyListCardProps) {
  const infoDivStyle: CSSProperties = {
    margin: '0px 30px',
  };
  const titleStyle: CSSProperties = {
    fontSize: '25px',
    marginBottom: '5px',
  };
  const infoStyle: CSSProperties = {
    fontSize: '15px',
    marginBottom: '5px',
  };

  const buttonDivStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  };
  const buttonStyle: CSSProperties = {
    margin: '8px 0px',
  };

  return (
    <ListCard style={props.style}>
      <>
        <div style={{ display: 'flex' }}>
          <StoreCoverImage store={props.groupBuyObject.store} />
          <div style={infoDivStyle}>
            <p style={titleStyle}>{props.groupBuyObject.groupName}</p>
            <p style={infoStyle}>
              開團人：{props.groupBuyObject.builder.userName}
            </p>
            <p style={infoStyle}>
              參團人數：{props.groupBuyObject.joinListCount}
            </p>
            <p style={infoStyle}>團單狀態：{props.groupBuyObject.statusText}</p>
            <p style={infoStyle}>{props.groupBuyObject.endTimeString}</p>
          </div>
        </div>
        <div style={buttonDivStyle}>
          <MyHoverButton
            size="long"
            style={buttonStyle}
            to={`/openGroup/GroupBuyInfo?id=${props.groupBuyObject.uid}`}
          >
            查看訂單
          </MyHoverButton>
        </div>
      </>
    </ListCard>
  );
}
