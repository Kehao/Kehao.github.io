/* eslint-disable @typescript-eslint/ban-types */
import * as React from 'react';
import { Row, Input, Button, Select, Form, DatePicker, Cascader } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';
import { SearchBarProps, SearchBarItemOption, ResValue, SearchBarItem } from './interface';
import './style/index.less';
import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const formItemsObj = {
  // 待扩展
  input: (value: any) => {
    const { className, onKeyDown } = value;
    return <Input placeholder="请输入" autoComplete="off" className={`width100' ${className}`} onKeyDown={onKeyDown} />;
  },
  select: (value: any) => {
    const { options = [], className, onChange, disabled, allowClear, showSearch, filterOption } = value;
    return (
      <Select
        placeholder="请选择"
        className={`width100 ${className}`}
        onChange={onChange}
        disabled={disabled}
        allowClear={allowClear}
        showSearch={showSearch}
        filterOption={filterOption}
      >
        {options.map((item: SearchBarItemOption) => (
          <Option key={item.value} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    );
  },
  rangePicker: (value: any) => {
    const { className } = value;
    return <RangePicker className={`width100 ${className}`} placeholder={['请选择', '请选择']} />;
  },
  datePicker: (value: any) => {
    const { className } = value;
    return <DatePicker className={`width100 ${className}`} placeholder={'请选择日期'} />;
  },
  cascader: (value: any) => {
    const { className, loadData, changeOnSelect, onChange, options = [] } = value;
    return (
      <Cascader
        className={`width100 ${className}`}
        onChange={onChange}
        placeholder={'请选择'}
        loadData={loadData}
        changeOnSelect={changeOnSelect}
        options={options}
      />
    );
  }
};

export default class SearchBar extends React.Component<SearchBarProps, any> {
  formRef = React.createRef<FormInstance>();
  onSearch = () => {
    const current = this.formRef?.current;
    const { dataScore } = this.props;
    if (current) {
      current.validateFields().then((values: Object) => {
        const res: ResValue = {};
        Object.keys(values).forEach(key => {
          const value = values[key];
          // 时间区段选择
          if (key.split('_')[0] === 'rangePicker') {
            for (let i = 0; i < dataScore.length; i += 1) {
              const it = dataScore[i];
              if (it.key === key) {
                const resKey = it.keys;
                if (resKey) {
                  if (typeof resKey[0] === 'string') {
                    res[resKey[0]] = value instanceof Array ? moment(value[0]).format(dateFormat) : undefined;
                  }
                  if (typeof resKey[1] === 'string') {
                    res[resKey[1]] = value instanceof Array ? moment(value[1]).format(dateFormat) : undefined;
                  }
                  break;
                }
              }
            }
          } else if (key.split('_')[0] === 'datePicker') {
            // 时间点选择
            res[key.split('_')[1]] = value ? moment(value).format(dateFormat) : undefined;
          } else {
            res[key] = value;
          }
        });
        this.props.onSearch(res);
      });
    }
  };
  onChange = (v: string, o: object, callback: Function) => {
    // 特殊业务下需要的，后去优化
    if (v && o && callback) {
      callback(v, o);
    } else if (v && callback) {
      callback(v);
    }
  };
  handleReset = () => {
    const { onReset, dataScore } = this.props;
    const defaultValue: ResValue = {};
    dataScore.forEach(item => {
      if (!item.disabled) {
        defaultValue[item.key] = item.defaultValue;
      }
    });
    this.formRef.current?.setFieldsValue(defaultValue);
    onReset?.();
  };
  getRangePickerInitValue = (keys: string[]) => {
    const { value } = this.props;
    if (value[keys[0]] && value[keys[1]]) {
      return [moment(value[keys[0]], dateFormat), moment(value[keys[1]], dateFormat)];
    }
    return null;
  };
  createFormItemList = () => {
    // 生成检索项
    const { dataScore, expand, value } = this.props;
    return dataScore.map((formItem: SearchBarItem, index) => {
      const { label, key, keys = [], type, onChangeCallback = () => null } = formItem;
      return (
        <div style={{ display: index > 2 && !expand ? 'none' : 'inline-block' }} className={'searchItem'} key={key}>
          <FormItem
            name={key}
            label={label}
            initialValue={type === 'rangePicker' ? this.getRangePickerInitValue(keys) : value[key]}
          >
            {formItemsObj[type]({
              ...formItem,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' && type === 'input') {
                  this.onSearch();
                }
              },
              onChange: (v: any, o: any) => this.onChange(v, o, onChangeCallback)
            })}
          </FormItem>
        </div>
      );
    });
  };
  render() {
    const { expand, onExpand, dataScore, canSearch } = this.props;
    const search = canSearch !== false;
    return (
      <div className={'searchFormContainer'}>
        <Form ref={this.formRef} {...defaultFormItemLayout}>
          <Row>{this.createFormItemList()}</Row>
        </Form>
        <div className={'optLine'}>
          <Button className={'resetBtn'} onClick={this.handleReset}>
            重置
          </Button>
          {search !== false && (
            <Button
              className={`searchBtnStyle searchBtn}`}
              icon={<SearchOutlined />}
              onClick={this.onSearch}
              type={'primary'}
            >
              查询
            </Button>
          )}
          <span style={dataScore.length > 3 ? {} : { display: 'none' }} onClick={onExpand} className={'unflod'}>
            <span className="button_font">{expand === true ? '收起' : '展开'}</span>
            {expand === true ? <UpOutlined /> : <DownOutlined />}
          </span>
        </div>
      </div>
    );
  }
}
