import { GroupBuyObject } from '@/interface/lib/GroupBuyObject';
import { CSSProperties } from 'react';
import { useGroupBuyList } from './utils/useGroupBuyList';
import {
  ChildMenu,
  Layout,
  MyHoverButton,
  GroupBuyListCard,
  GroupListEmpty,
  SearchPagination,
} from '@/component';

export default function NowGroup() {
  const { showList, pageStatus, pagination, searchInput } =
    useGroupBuyList('now');
  const searchDivStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  };

  return (
    <Layout status={pageStatus} shouldLoginTurnToHome>
      <ChildMenu />
      {showList.length > 0 ? (
        <>
          <div style={searchDivStyle}>
            <MyHoverButton
              theme="green"
              style={{ minWidth: '110px', marginRight: '20px' }}
              to={`/NewOpen`}
            >
              ＋開新團
            </MyHoverButton>
            <SearchPagination
              searchInput={searchInput}
              pagination={pagination}
            />
          </div>
          <div>
            {showList.map((object: GroupBuyObject) => (
              <GroupBuyListCard key={object.uid} groupBuyObject={object} />
            ))}
          </div>
        </>
      ) : (
        <GroupListEmpty />
      )}
    </Layout>
  );
}
