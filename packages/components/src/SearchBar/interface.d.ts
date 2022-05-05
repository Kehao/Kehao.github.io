/* eslint-disable @typescript-eslint/ban-types */
export type ResValue = Record<string, any>;
export type SearchBarValue = Record<string, any>;
export interface SearchBarItemOption {
  label: string;
  value: string;
  children?: SearchBarItemOption[];
}
export interface SearchBarItem {
  key: string;
  label: string;
  type: 'input' | 'select' | 'rangePicker' | 'datePicker' | 'cascader'; // 暂时只支持
  options?: SearchBarItemOption[];
  disabled?: boolean;
  allowClear?: boolean;
  keys?: string[];
  defaultValue?: {};
  className?: string;
  filterOption?: (v: string, o: object) => void;
  onChangeCallback?: (v: string, o: object) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}
export interface SearchBarProps {
  value: SearchBarValue;
  dataScore: SearchBarItem[];
  expand?: boolean;
  pageName?: string;
  canSearch?: boolean;
  onSearch: (v: SearchBarValue) => void;
  onReset?: () => void;
  onExpand?: () => void;
}
