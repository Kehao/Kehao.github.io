import React, { FunctionComponent } from 'react';
import './style/index.less';

interface IFactory {
  render: any;
  rowStart: number;
  colStart: number;
  row: number;
}

type IGridItem = {
  coordinate: number[];
  content: any;
};

type TIndex = {
  data: FunctionComponent[];
  col: string;
  row: string;
  style: Record<string, unknown>;
};

const GridItem: FunctionComponent<IGridItem> = ({
  coordinate: [gridColumnStart, gridColumnEnd, gridRowStart, gridRowEnd],
  content
}) => (
  <div className={'itemWrap'} style={{ gridColumnStart, gridColumnEnd, gridRowStart, gridRowEnd }}>
    {content}
  </div>
);
// vertical horizontal
const combine = (params: { content: IGridItem[] }, [col1, col2, row1, row2]: number[], mode = 'horizontal') => {
  return params.content.map((item, index) =>
    Array.isArray(item) ? (
      item.map((item1, index1) => (
        <GridItem
          content={item1}
          coordinate={
            mode === 'horizontal'
              ? [col1 + index1, col1 + index1 + 1, row1 + index, row1 + index + 1]
              : [col1 + index, col2, row1 + index1, row1 + index1 + 1]
          }
        />
      ))
    ) : (
      <GridItem
        content={item}
        coordinate={
          mode === 'horizontal'
            ? [col1, col2, row1 + index, row1 + index + 1]
            : [col1 + index, col1 + index + 1, row1, row2]
        }
      />
    )
  );
};
const factory: FunctionComponent<IFactory> = params => {
  const { render, rowStart, colStart = 1, row = 1 } = params;
  let count = colStart;
  const positionArr = render.map((item: { col: number }) => {
    if ('col' in item) {
      const temp = count;
      count += item.col;
      return temp;
    }
    const temp1 = count;
    count += 1;
    return temp1;
  });

  // console.log('positionArr', positionArr)

  const c = render.map((item: any, i: number) => {
    const { content, col = 1 } = item;
    return Array.isArray(content) ? (
      combine(item, [positionArr[i], positionArr[i] + col, rowStart, rowStart + row], item.mode)
    ) : (
      <GridItem coordinate={[positionArr[i], positionArr[i] + col, rowStart, rowStart + row]} content={content} />
    );
  });
  // console.log(c.flat())
  return c.flat();
};

const Index: FunctionComponent<TIndex> = ({ data, col, row, style = {} }) => {
  return (
    <div
      style={{
        display: 'grid',
        width: '100%',
        backgroundColor: '#fff',
        borderTop: '1px solid #F3F3F3',
        borderLeft: '1px solid #F3F3F3',
        gridTemplateColumns: col,
        gridTemplateRows: row,
        ...style
      }}
    >
      {data.map((item: any, index) => factory(item, index))}
    </div>
  );
};

export default Index;
