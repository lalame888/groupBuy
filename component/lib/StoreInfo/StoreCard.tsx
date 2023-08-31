import { StoreObject } from '@/interface';
import { CSSProperties } from 'react';
import { StoreCoverImage } from '../Image';
import { MyHoverButton } from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as FullHeart } from '@fortawesome/free-solid-svg-icons';
import { useStoreCard } from './utils/useStoreCard';
import { ListCard } from '../Card';

interface StoreCardProps {
  store: StoreObject;
  style?: CSSProperties;
}

export function StoreCard(props: StoreCardProps) {
  const { isLogin, isFavoriteStore, loading, toggleFavorite, errorMessage } =
    useStoreCard(props.store);

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
          <StoreCoverImage store={props.store} />
          <div style={infoDivStyle}>
            <p style={titleStyle}>{props.store.name}</p>
            <p style={infoStyle}>地址：{props.store.address}</p>

            <p style={infoStyle}>營業時間：{props.store.businessHours[0]}</p>
            {props.store.businessHours.length > 1 && (
              <>
                {props.store.businessHours
                  .slice(1, props.store.businessHours.length)
                  .map((time, index) => {
                    return <p key={index}>{`     ${time}`}</p>;
                  })}
              </>
            )}
          </div>
        </div>
        <div style={buttonDivStyle}>
          <MyHoverButton
            style={buttonStyle}
            to={`/StorePage/StoreInfo?id=${props.store.uid}`}
          >
            查看詳細
          </MyHoverButton>
          {isLogin && (
            <MyHoverButton
              disabled={loading}
              style={buttonStyle}
              onClick={toggleFavorite}
            >
              {isFavoriteStore ? (
                <span>
                  已收藏{' '}
                  <FontAwesomeIcon
                    icon={FullHeart}
                    style={{ color: '#ff0000b3' }}
                  />
                </span>
              ) : (
                <span>
                  收藏 <FontAwesomeIcon icon={faHeart} />
                </span>
              )}
            </MyHoverButton>
          )}
          <MyHoverButton
            style={buttonStyle}
            onClick={() => {
              // TODO
            }}
          >
            開團
          </MyHoverButton>
        </div>
      </>
    </ListCard>
  );
}
