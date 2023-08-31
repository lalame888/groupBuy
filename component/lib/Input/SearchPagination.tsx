import { PaginationData, SearchInputData } from '@/feature';
import { SearchInput } from './SearchInput';
import { PaginationSelector } from '../Other';

interface SearchPaginationProps {
  searchInput: SearchInputData;
  pagination: PaginationData;
}
export function SearchPagination(props: SearchPaginationProps) {
  const { set, value } = props.searchInput;
  const { pageNumber, maxPage, setPageNumber } = props.pagination;
  return (
    <div style={{ display: 'flex' }}>
      <SearchInput
        onChange={(newValue: string) => set(newValue)}
        value={value}
      />
      <PaginationSelector
        nowPageNumber={pageNumber}
        maxPageNumber={maxPage}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
