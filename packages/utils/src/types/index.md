---
nav:
  path: /utils
group:
  title: typescript
  order: 2
  path: /utils/types
---

# 辅助函数

```js
// Usage
// tupleNum:
import { tupleNum } from '@b1/utils';
const TITLE_ELE_LIST = tupleNum(1, 2, 3, 4, 5);
interface Level {
  level?: typeof TITLE_ELE_LIST[number];
}

// tuple:
import { tuple } from '@b1/utils';
const SpinSizes = tuple('small', 'default', 'large');
export type SpinSize = typeof SpinSizes[number];
export interface SpinProps {
  prefixCls?: string;
  className?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: SpinSize;
  tip?: React.ReactNode;
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
}

// LiteralUnion:
import { LiteralUnion } from '@b1/utils';
export interface RibbonProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties; // style of ribbon element, not the wrapper
  text?: React.ReactNode;
  color?: LiteralUnion<PresetColorType, string>; // 并集
  children?: React.ReactNode;
  placement?: RibbonPlacement;
}

// ElementOf:
import { ElementOf } from '@b1/utils';
export const PresetColorTypes = tuple(
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
);

export type PresetColorType = ElementOf<typeof PresetColorTypes>;

// Omit:
import { Omit } from '@b1/utils';
export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}
```
