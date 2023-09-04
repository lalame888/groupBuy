import { ChildMenu, Layout, SearchPagination, StoreCard } from '@/component';
import { useStoryInfoList } from './utils/useStoryInfoList';
import { StoreObject } from '@/interface';
import { useState } from 'react';
export default function SearchStore() {
  const [search, setSearch] = useState<string>('');
  const { showList, pageStatus, pagination, searchInput } = useStoryInfoList(
    'search',
    search,
  );
  return (
    <Layout status={pageStatus}>
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
