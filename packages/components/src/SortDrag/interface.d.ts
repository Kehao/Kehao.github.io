// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface valueItem {
  [keyName: string]: any;
}
export interface SortProps {
  dataList: valueItem[];
  sortCallback: (v: valueItem) => void;
  isNo?: boolean;
  titleName?: string;
  wrapStyles?: any;
  ulStyles?: any;
}
