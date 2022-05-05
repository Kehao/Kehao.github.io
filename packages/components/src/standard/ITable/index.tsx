import React from 'react';
import { Table, TableProps } from 'antd';
import './style/index.less';

interface ITableProps extends TableProps<any> {
  hasNum?: boolean;
}

const ITable = (tableProps: ITableProps): React.ReactElement => {
  const { hasNum = true, columns } = tableProps;
  if (hasNum) {
    columns.unshift({
      title: '序号',
      fixed: 'left',
      width: 43,
      render: (_text, _record, idx) => <div style={{ textAlign: 'center' }}>{idx + 1}</div>
    });
  }
  return (
    <div className="ITable">
      <Table rowClassName={(r, idx) => (idx % 2 === 0 && 'even') || 'odd'} columns={columns} {...tableProps} />
    </div>
  );
};

export default ITable;
