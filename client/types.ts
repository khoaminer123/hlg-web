
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  category: string;
}

export interface NavItem {
  label: string;
  path: string;
}
