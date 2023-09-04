import {
  ChildMenu,
  Layout,
  MyHoverButton,
  MyInput,
  PageTitle,
  SearchPagination,
  StoreCard,
} from '@/component';
import { useStoryInfoList } from './utils/useStoryInfoList';
import { LoadStatus, StoreObject } from '@/interface';
import { useState } from 'react';
import { useReduxSelector } from '@/redux';
import { FormControl } from 'react-bootstrap';
import { THEME } from '@/styles/theme';
export default function SearchStore() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const { showList, pageStatus, pagination } = useStoryInfoList(
    'search',
    search,
  );
  const isSearching = pageStatus.loadStatus === LoadStatus['載入中'];
  function onSearch() {
    console.log('s', searchInput);
    setSearch(searchInput);
  }
  return (
    <Layout status={pageStatus}>
      <ChildMenu />
      {showList.length > 0 ? (
        <>
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
          {pagination.maxPage > 1 && (
            <SearchPagination pagination={pagination} />
          )}
          <div>
            {showList.map((store: StoreObject) => (
              <StoreCard key={store.uid} store={store} />
            ))}
          </div>
        </>
      ) : (
        <div style={{ padding: '20px' }}>
          <MyHoverButton
            style={{ border: THEME.border, backgroundColor: '#E5E5E533' }}
            to={'/StorePage/AddStore'}
          >
            <div style={{ marginTop: '1rem' }}>
              <p>搜尋結果：無</p>
              <p>點選此區塊以新增此店家</p>
            </div>
          </MyHoverButton>
        </div>
      )}
    </Layout>
  );
}
