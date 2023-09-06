import {
  ChildMenu,
  Layout,
  MyHoverButton,
  NoDataButton,
  PageTitle,
  SearchPagination,
  StoreCard,
} from '@/component';
import { useStoryInfoList } from './utils/useStoryInfoList';
import { LoadStatus, StoreObject } from '@/interface';
import { useState } from 'react';
import { FormControl } from 'react-bootstrap';
export default function SearchStore() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const { showList, pageStatus, pagination } = useStoryInfoList(
    'search',
    search,
  );
  const isSearching = pageStatus.loadStatus === LoadStatus['載入中'];
  function onSearch() {
    setSearch(searchInput);
  }
  return (
    <Layout status={pageStatus}>
      <ChildMenu />
      <div style={{ display: 'flex', marginBottom: '30px' }}>
        <FormControl
          disabled={isSearching}
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === 'NumberEnter') {
              onSearch();
            }
          }}
        />
        <MyHoverButton
          theme="green"
          style={{ borderRadius: 0 }}
          disabled={isSearching}
          onClick={onSearch}
        >
          搜尋
        </MyHoverButton>
      </div>
      <PageTitle title={search === '' ? '推薦店家' : '搜尋結果'} />
      {pagination.maxPage > 1 && <SearchPagination pagination={pagination} />}
      {showList.length > 0 ? (
        <div>
          {showList.map((store: StoreObject) => (
            <StoreCard key={store.uid} store={store} />
          ))}
        </div>
      ) : (
        <NoDataButton
          to={`/StorePage/AddStore${search ? `?search=${search.trim()}` : ''}`}
          text={['搜尋結果：無', '點選此區塊以新增此店家']}
        />
      )}
    </Layout>
  );
}
