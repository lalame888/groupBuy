import { GroupBuyObject } from '@/interface/lib/GroupBuyObject';
import { useGroupBuyList } from './utils/useGroupBuyList';
import {
  ChildMenu,
  Layout,
  GroupBuyListCard,
  GroupListEmpty,
  SearchPagination,
} from '@/component';

export default function HistoryGroup() {
  const { showList, pageStatus, pagination, searchInput } =
    useGroupBuyList('history');

  return (
    <Layout status={pageStatus} shouldLoginTurnToHome>
      <ChildMenu />
      {showList.length > 0 ? (
        <>
          <SearchPagination searchInput={searchInput} pagination={pagination} />
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
