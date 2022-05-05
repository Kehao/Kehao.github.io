export type DragModalValue = Record<string, any>;

export interface DragModalProps {
  currPos?: number[];
  title?: string;
  className?: string;
  wrapStyles?: any;
  titleStyles?: any;
  visible: boolean;
  onCancel: () => void;
  // onRef: (v: DragModalValue) => void;
}
