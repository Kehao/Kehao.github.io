/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { Table, TableProps } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import './style/index.less';

interface RowExpandAtt<RecordType> {
  attr: string;
  format: (attr: string, record: RecordType) => RecordType;
  columns: RecordType[];
  downloadIndex?: string;
}
interface ISmallTablePros<RecordType> extends TableProps<RecordType> {
  rowExpandAtts?: RowExpandAtt<RecordType>[];
}
interface ISmallTableFC {
  (tableProps: ISmallTablePros<Record<string, any>>): React.ReactElement;
}

const ISmallTable: ISmallTableFC = ({ rowExpandAtts, ...tableProps }) => {
  const isEmpty = () => {
    let isEmptyTmp = true;
    rowExpandAtts &&
      rowExpandAtts.forEach(attr => {
        tableProps.dataSource &&
          tableProps.dataSource.forEach(record => {
            if (isEmptyTmp && [null, undefined, ''].indexOf(record[attr.attr]) < 0) {
              isEmptyTmp = false;
            }
          });
      });

    return isEmptyTmp;
  };

  const onResourceClick = url => window.open(url);

  const rowExpandable = record =>
    !!(
      rowExpandAtts &&
      rowExpandAtts.find(rowExpandAttr => [null, undefined, ''].indexOf(record[rowExpandAttr.attr]) < 0)
    );

  const expandedRowRender = record => {
    const html = [];
    rowExpandAtts.forEach(rowExpandAtt => {
      if (record[rowExpandAtt.attr]) {
        let attrValues = (Array.isArray(record[rowExpandAtt.attr]) && record[rowExpandAtt.attr]) || [
          record[rowExpandAtt.attr]
        ];
        const columns = (rowExpandAtt.columns && [...rowExpandAtt.columns]) || [];
        if (rowExpandAtt.format) {
          attrValues = attrValues.map(attrValue => rowExpandAtt.format(attrValue, record));
        }
        if (rowExpandAtt.downloadIndex) {
          columns.push({
            title: '操作',
            render: rd => (
              <a onClick={() => onResourceClick(rd[rowExpandAtt.downloadIndex])}>
                <PaperClipOutlined /> 下载
              </a>
            )
          });
        }
        html.push(
          <Table
            key={rowExpandAtt.attr}
            rowKey={(_r, i) => rowExpandAtt.attr + i}
            dataSource={attrValues}
            size="small"
            columns={columns}
            pagination={false}
          />
        );
      }
    });
    return <div>{html}</div>;
  };
  const getExpandable = () => rowExpandAtts && { expandedRowRender, rowExpandable };
  const expandableProps = (!isEmpty() && { expandable: getExpandable() }) || {};
  return (
    <div className="ISmallTable">
      <Table rowClassName={(_r, idx) => (idx % 2 === 0 && 'even') || 'odd'} {...expandableProps} {...tableProps} />
    </div>
  );
};

export default ISmallTable;
