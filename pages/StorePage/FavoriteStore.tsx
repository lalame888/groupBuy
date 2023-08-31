import { ChildMenu, Layout, SearchPagination, StoreCard } from '@/component';
import { useStoryInfoList } from './utils/useStoryInfoList';
import { StoreObject } from '@/interface';
export default function FavoriteStore() {
  const { showList, pageStatus, pagination, searchInput } =
    useStoryInfoList('favorite');
  return (
    <Layout status={pageStatus} shouldLoginTurnToHome>
      <ChildMenu />
      {showList.length > 0 ? (
        <>
          <SearchPagination searchInput={searchInput} pagination={pagination} />
          <div>
            {showList.map((store: StoreObject) => (
              <StoreCard key={store.uid} store={store} />
            ))}
          </div>
        </>
      ) : (
        <div />
      )}
    </Layout>
  );
}
