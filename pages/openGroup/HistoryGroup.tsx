import { GroupBuyObject } from '@/interface/lib/GroupBuyObject';
import { useGroupBuyList } from './utils/useNowGroupBuy';
import {
  ChildMenu,
  Layout,
  PaginationSelector,
  SearchInput,
  GroupBuyListCard,
  GroupListEmpty,
} from '@/component';

export default function HistoryGroup() {
  const {
    errorMessage,
    showList,
    loadStatus,
    pagination: { maxPage, pageNumber, setPageNumber },
    searchInput,
  } = useGroupBuyList('history');

  return (
    <Layout status={{ loadStatus, errorMessage }} shouldLoginTurnToHome>
      <ChildMenu />
      {showList.length > 0 ? (
        <>
          <div style={{ display: 'flex' }}>
            <SearchInput
              onChange={(newValue: string) => searchInput.set(newValue)}
              value={searchInput.value}
            />
            <PaginationSelector
              nowPageNumber={pageNumber}
              maxPageNumber={maxPage}
              setPageNumber={setPageNumber}
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
