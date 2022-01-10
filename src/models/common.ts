export interface PaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface ParamsAPIs {
  [key: string]: any;
}

export interface ListResponse<T> {
  data: T[];
}

export interface ActionReducer {
  readonly type: string;
  readonly payload?: any;
}
