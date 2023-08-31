export enum LoggingLevel {
  'TRACE',
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
  'FATAL',
}

export enum ErrorCode {
  '載入用戶資訊錯誤' = '0010',
  '載入目前團單列表錯誤' = '0020',
  '載入團單資訊發生錯誤' = '0030',
  '團單變更狀態失敗' = '0040',
  '刪除訂單失敗' = '0050',
  '儲存訂單失敗' = '0051',
  '訂單收貨狀態變更失敗' = '0052',
  '更變店家收藏狀態失敗' = '0060',
}

export enum LoadStatus {
  '載入中' = 'loading',
  '載入成功' = 'success',
  '載入失敗' = 'error',
}

export type LoadingStatus = {
  loadStatus: LoadStatus;
  errorMessage?: string; // 是否有錯誤訊息，如果狀態為失敗＆有錯誤訊息顯示錯誤訊息
};

export enum InfoPage {
  '資訊頁' = 'info',
  '編輯團單' = 'editGroup',
  '編輯訂單' = 'editOrder',
}
