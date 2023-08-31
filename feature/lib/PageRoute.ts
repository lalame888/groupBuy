export enum PageState {
  '開團' = 'openGroup',
  '瀏覽商家' = 'StorePage',
  '使用說明' = 'help',
  '關於輕鬆開好團' = 'info',
  '聯絡我們' = 'mail',
}

export class PageRoute {
  static childMenu(pathName: PageState) {
    switch (pathName) {
      case PageState['開團']:
        return [
          { pageName: '開新團', page: 'NewOpen' },
          { pageName: '跟新團', page: 'JoinNew' },
          { pageName: '目前團單', page: 'NowGroup', isDefault: true },
          { pageName: '歷史團單', page: 'HistoryGroup' },
        ];
      case PageState['瀏覽商家']:
        return [
          { pageName: '搜尋商家', page: 'SearchStore', isDefault: true },
          { pageName: '收藏商家', page: 'FavoriteStore' },
        ];
      default:
        return [];
    }
  }
  static defaultChild(pathName: PageState) {
    const emptyChild = { pageName: '', page: '' };
    const childMenu = this.childMenu(pathName);
    if (childMenu.length === 0) return emptyChild;
    return childMenu.find((c) => c.isDefault) || emptyChild;
  }
}
