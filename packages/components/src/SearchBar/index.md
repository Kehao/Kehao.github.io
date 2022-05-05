---
nav:
  title: '通用组件'
  path: /components
group:
  path: /components/others
---

## SearchBar

```jsx
import React from 'react';
import { SearchBar } from '@b1/components';
const value = {
  name: undefined,
  sex: undefined,
  jobStart: undefined,
  jobEnd: undefined,
  birthday: undefined,
  address: undefined
};
const dataScore = [
  {
    type: 'input',
    label: '姓名',
    key: 'name'
  },
  {
    type: 'select',
    label: '性别',
    key: 'sex',
    options: [
      { label: '男', value: '1' },
      { label: '女', value: '2' }
    ]
  },
  {
    type: 'rangePicker',
    label: '工作时间',
    key: 'rangePicker_jobStart_jobEnd',
    keys: ['jobStart', 'jobEnd']
  },
  {
    type: 'datePicker',
    label: '出生日期',
    key: 'datePicker_birthday'
  },
  {
    type: 'cascader',
    label: '出生地址',
    key: 'address',
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake'
              }
            ]
          }
        ]
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men'
              }
            ]
          }
        ]
      }
    ]
  }
];
export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canSearch: true,
      expand: false,
      areaList: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          isLeaf: false
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          isLeaf: false
        }
      ],
      searchInfo: {
        name: '',
        deptId: '',
        startTime: '',
        endTime: '',
        date: ''
      }
    };
  }
  getItemList = () => {
    return [
      {
        type: 'input',
        label: '姓名',
        key: 'name'
      },
      {
        type: 'select',
        key: 'deptId',
        label: '科室',
        options: [
          {
            label: '科室1',
            value: '1'
          },
          {
            label: '科室2',
            value: '2'
          }
        ],
        showSearch: true
      },
      {
        type: 'rangePicker',
        key: 'rangePicker_startTime_endTime',
        keys: ['startTime', 'endTime'],
        label: '时间段'
      },
      {
        type: 'cascader',
        key: 'areaidList',
        label: '开单地区',
        defaultValue: '',
        loadData: this.loadCascadeData,
        changeOnSelect: true,
        options: this.state.areaList
      },
      {
        type: 'datePicker',
        key: 'datePicker_data',
        label: '预约日期',
        keys: ['data']
      }
    ];
  };

  loadCascadeData = options => {
    const targetOption = options[options.length - 1];
    targetOption.loading = true;
    // 调用接口 获取数据
    setTimeout(() => {
      const data = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1'
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2'
        }
      ];
      targetOption.loading = false;
      targetOption.children = data || [];
      // 需要刷新页面
      this.setState({
        areaList: [...this.state.areaList]
      });
    }, 500);
  };

  onSearch = params => {
    console.log(params);
    console.log('点击搜索-获取数据-刷新table');
  };

  onReset = () => {
    console.log('点击重置-重置数据');
  };

  onExpand = () => {
    this.setState({ expand: !this.state.expand });
  };
  render() {
    return (
      <SearchBar
        value={value}
        dataScore={dataScore}
        expand={this.state.expand}
        onSearch={this.onSearch}
        onExpand={this.onExpand}
        onReset={this.onReset}
        canSearch={this.state.canSearch}
      />
    );
  }
}
```

## API

| 属性项     | 说明                    | type                | required | default |
| :--------- | :---------------------- | :------------------ | :------- | :------ |
| dataSource | table 的数据源          | dataItem:[]         | true     | []      |
| value      | 完全受控组件的 value 值 | []                  | false    |
| expand     | 控制组件的展开          | boolean             | false    | false   |
| onSearch   | 点击查询按钮的回调      | function(params:[]) | -        |
| onReset    | 点击重置点击事件的回调  | function()          | false    | -       |
| onExpand   | 点击展示时的回调        | fuction()           | false    | -       |
| canSearch  | 是否可以查询            | boolean             | false    | true    |

### dataItem

| 属性项 | 说明                                                                               | type    | required             | default       |
| :----- | :--------------------------------------------------------------------------------- | :------ | :------------------- | :------------ |
| type   | 搜索项的类型                                                                       | 'input' | 'select'             | 'rangePicker' | 'datePicker' | 'cascader' | true |
| key    | 唯一值                                                                             | string  | true                 | -             |
| label  | 展示的名字                                                                         | string  | true                 | -             |
| label  | 展示的名字                                                                         | string  | true                 | -             |
| keys   | 针对时间的选择，最终 对外输出的 params 对象的 key 值，比如 ['startTime','endTime'] | []      | 仅当是使用日期是必须 | null          |
