/* eslint-disable */
import React, { Fragment } from 'react';
import { SortProps } from './interface';
import { deepClone } from '@b1/utils';
import './style/index.less';

export default class SortDrag extends React.Component<SortProps, any> {
  containerNode = React.createRef<HTMLUListElement>();
  constructor(props) {
    super(props);
    this.state = {
      active: '',
      dragType: false
    };
  }
  componentDidMount() {
    const { dataList } = this.props;
    if (Array.isArray(dataList) && dataList.length < 2) {
      return;
    }
    // 创建一个拖拽Dom
    let dragDom: any = null;
    // 使用事件委托，将li的事件委托给ul
    this.containerNode.current.ondragstart = (event: any) => {
      // start Drop
      // firefox设置了setData后元素才能拖动！！！！
      event.dataTransfer.setData('te', event.target.innerText); // 不能使用text，firefox会打开新tab
      // event.dataTransfer.setData("self", event.target);
      dragDom = event.target;
      this.setState({ dragType: true });
      dragDom.style.background = '#E0F0FF';
      dragDom.style.border = '1px solid #188EF2';
      dragDom.style.boxShadow = '0px 2px 4px 0px rgba(24,142,242,0.2)';
    };

    this.containerNode.current.ondragend = () => {
      dragDom.style.background = '#fff';
      dragDom.style.border = '';
      dragDom.style.boxShadow = '';
      this.setState({ dragType: false });
      this.callbackData();
    };

    this.containerNode.current.ondragover = (event: any) => {
      event.preventDefault();
      const { target } = event;
      // 因为dragover会发生在ul上，所以要判断是不是li
      if (target.nodeName === 'LI' && target !== dragDom) {
        const targetRect = target.getBoundingClientRect();
        const dragDomRect = dragDom.getBoundingClientRect();
        if (target && target.animated) {
          return;
        }
        if (this._index(dragDom) < this._index(target)) {
          target.parentNode.insertBefore(dragDom, target.nextSibling);
        } else {
          target.parentNode.insertBefore(dragDom, target);
        }
        this._animate(dragDomRect, dragDom);
        this._animate(targetRect, target);
      }
    };
  }
  // 获取元素在父元素中的index
  _index = (el: any) => {
    let index = 0;
    if (!el || !el.parentNode) {
      return -1;
    }

    while (el && (el = el.previousElementSibling)) {
      index++;
    }
    return index;
  };
  _animate = (prevRect: any, target: any) => {
    const ms = 300;
    if (ms) {
      const currentRect = target.getBoundingClientRect();
      if (prevRect.nodeType === 1) {
        prevRect = prevRect.getBoundingClientRect();
      }
      this._css(target, 'transition', 'none');
      this._css(
        target,
        'transform',
        `translate3d(${prevRect.left - currentRect.left}px,${prevRect.top - currentRect.top}px,0)`
      );

      const t = target.offsetWidth; // 触发重绘
      this._css(target, 'transition', `all ${ms}ms`);
      this._css(target, 'transform', 'translate3d(0,0,0)');
      clearTimeout(target.animated);
      const _this = this;
      target.animated = setTimeout(() => {
        _this._css(target, 'transition', '');
        _this._css(target, 'transform', '');
        target.animated = false;
      }, ms);
    }
  };
  // 给元素添加style
  _css = (el: any, prop: any, val: any) => {
    const style = el && el.style;
    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, '');
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }
        return prop === void 0 ? val : val[prop];
      }
      if (!(prop in style)) {
        prop = `-webkit-${prop}`;
      }
      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  };
  // 数据回调
  callbackData = () => {
    const { dataList, sortCallback } = this.props;
    const dom = this.containerNode.current.childNodes;
    // 获取新的key顺序
    const order: any[] = [];
    dom.forEach((item: any) => {
      order.push(item.dataset.key);
    });
    // 获取新顺序的数组
    const newDataArray = deepClone(dataList);
    newDataArray.sort((a: any, b: any) => {
      const prev = order.indexOf(a.key);
      const next = order.indexOf(b.key);
      return prev - next;
    });
    sortCallback(newDataArray);
  };
  render() {
    const { dataList, isNo, titleName, wrapStyles, ulStyles } = this.props;
    const { active, dragType } = this.state;

    return (
      <Fragment>
        <div className="wrap">
          {isNo && (
            <div className="orderNumWrap" style={wrapStyles}>
              {dataList.map((item, index) => (
                <div key={index + 1} className="orderNumWrapNo">
                  {index + 1}
                </div>
              ))}
            </div>
          )}
          <ul ref={this.containerNode} className="containerUl" style={ulStyles}>
            {dataList.map(item => (
              <li
                key={item.key}
                onMouseEnter={(e: any) => !dragType && this.setState({ active: e.target.dataset.key })}
                onMouseOut={() => this.setState({ active: '' })}
                data-key={item.key}
                style={{
                  background: active === item.key && '#E0F0FF',
                  border: active === item.key && '1px solid #188EF2',
                  boxShadow: active === item.key && '0px 2px 4px 0px rgba(24,142,242,0.2)'
                }}
                className={active === item.key ? `ele_shadow contentShadowLi` : `ele contentLi`}
                draggable="true"
              >
                {titleName ? item[titleName] : item.title}
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}
