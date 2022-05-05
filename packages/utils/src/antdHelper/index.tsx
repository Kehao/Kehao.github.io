import React from 'react';
import { Select, Tooltip } from 'antd';
import { generatorId } from '../common';
import { FormOutlined, SolutionOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less';

const { Option } = Select;

declare type RawValue = string | number;
declare type RecordType = Record<RawValue, any>;
interface RenderOptions {
  (list: { code: RawValue; name: RawValue }[], value: RawValue, label: RawValue): React.ReactNode[] | [];
}
export const renderOptions: RenderOptions = (list = [], value = 'code', label = 'name') => {
  return list.map(item => (
    <Option value={item[value]} key={item[value]}>
      {item[label]}
    </Option>
  ));
};
interface RenderRowOpts {
  (rowOrId: number | string | RecordType, opts: RecordType, conds: RecordType): React.ReactElement;
}

export const renderRowOpts: RenderRowOpts = (rowOrId, opts, conds = {}) => {
  const isRender = optStr => {
    return opts[optStr] && ((conds[optStr] && conds[optStr](rowOrId)) || conds[optStr] === undefined);
  };
  return (
    <span className={'renderRowOpts'}>
      {
        <Tooltip placement="top" title={'详情'}>
          {isRender('show') && (
            <a onClick={() => opts.show(rowOrId)}>
              <SolutionOutlined />
            </a>
          )}
        </Tooltip>
      }
      {
        <Tooltip placement="top" title={'编辑'}>
          {isRender('edit') && (
            <a onClick={() => opts.edit(rowOrId)}>
              <FormOutlined />
            </a>
          )}
        </Tooltip>
      }
      {
        <Tooltip placement="top" title={'删除'}>
          {isRender('del') && (
            <a onClick={() => opts.del(rowOrId)}>
              <DeleteOutlined />
            </a>
          )}
        </Tooltip>
      }
    </span>
  );
};

interface uploadFile {
  name: string;
  url?: string;
  response?: { data: string };
}
export const transformFilesForSubmit = (files: uploadFile[]): any[] => {
  return files.map(file => ({
    name: file.name,
    url: file.url || (file.response && file.response.data)
  }));
};

export const transformFilesForPreview = (files: any[]): any[] => {
  return (files || []).map(file => ({
    uid: generatorId('uid'),
    status: 'done',
    ...file
  }));
};
