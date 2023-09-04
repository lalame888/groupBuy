import { PageStatus } from '@/component/lib/Layout';
import { LoadStatus, LoggingLevel, UserInfo } from '@/interface';
import { useReduxSelector } from '@/redux/store';
import { useEffect, useMemo, useState } from 'react';
import { serverUtils } from './ServerUtils';
import { toSBC } from '@/utils';

export type SearchInputData = {
  value: string;
  set: (newValue: string) => void;
};
export type PaginationData = {
  maxPage: number;
  pageNumber: number;
  setPageNumber: (newNumber: number) => void;
};

export function useList<T>(
  userInfo: UserInfo | null,
  loadFunction: () => Promise<T[]>,
  inputFilter: (item: T, inputText: string) => boolean,
) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [list, setList] = useState<T[] | undefined>(undefined);
  const loadStatus: LoadStatus =
    list === undefined
      ? LoadStatus['載入中']
      : errorMessage
      ? LoadStatus['載入失敗']
      : LoadStatus['載入成功'];
  const pageStatus: PageStatus = {
    loadStatus,
    errorMessage,
  };
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    if (userInfo) {
      loadList();
    } else {
      setList([]);
    }
    async function loadList() {
      try {
        const loadedList = await loadFunction();
        setList(loadedList);
      } catch (error) {
        const message = `取得列表發生錯誤。 錯誤訊息: ${error}`;
        setErrorMessage(message);
        serverUtils.addLog(message, LoggingLevel['ERROR']);
      }
    }
  }, []);

  useEffect(() => {
    setPageNumber(1);
  }, [searchInput]);

  const pageNation = 10; // 10筆一頁

  const filterList = useMemo(() => {
    if (!list || list.length === 0) return [];
    return list.filter((item: T) => {
      const searchText = toSBC(searchInput);
      if (searchText.trim() === '') return true;
      return inputFilter(item, searchText);
    });
  }, [list, searchInput]);

  const showList = useMemo(() => {
    return filterList.slice(
      (pageNumber - 1) * pageNation,
      pageNumber * pageNation,
    );
  }, [filterList, pageNumber]);

  const maxPage = Math.ceil(filterList.length / pageNation);

  return {
    showList,
    pageStatus,
    pagination: {
      maxPage,
      pageNumber,
      setPageNumber,
    },
    searchInput: {
      value: searchInput,
      set: setSearchInput,
    },
  };
}
