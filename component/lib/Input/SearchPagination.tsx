import { PaginationData, SearchInputData } from '@/feature';
import { SearchInput } from './SearchInput';
import { PaginationSelector } from '../Other';

interface SearchPaginationProps {
  searchInput?: SearchInputData;
  pagination: PaginationData;
}
export function SearchPagination(props: SearchPaginationProps) {
  const { pageNumber, maxPage, setPageNumber } = props.pagination;
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {props.searchInput && (
        <SearchInput
          onChange={(newValue: string) => props.searchInput?.set(newValue)}
          value={props.searchInput.value}
        />
      )}

      <PaginationSelector
        nowPageNumber={pageNumber}
        maxPageNumber={maxPage}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
