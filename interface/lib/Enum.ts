

export enum LoggingLevel {
  'TRACE',
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
  'FATAL'
}

export enum ErrorCode {
  '載入用戶資訊錯誤' = '0010',
  '載入目前團單列表錯誤' = '0020',
}

export enum LoadStatus {
  '載入中' = 'loading',
  '載入成功' = 'success',
  '載入失敗' = 'error'
}
