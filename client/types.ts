
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'shareholder';
  isFirstLogin: boolean;
  fullName?: string;
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
