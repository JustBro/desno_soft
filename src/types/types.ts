export type AuthState = {
  isLoggedIn: boolean;
};

export type UiState = {
  isAuthChecked: boolean,
};

export type TableState = {
  data: TableItem[];
  requestsPerPage: number;
};

export type TableItem = {
  id: number;
  theme: string;
  number: number;
  createDate: string;
  changeDate: string;
  finishDate: string;
  status: string;
  description: string;
  service: string;
  serviceComposition: string;
};


