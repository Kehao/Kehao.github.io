import * as React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DragModalProps } from './interface';
import './style/index.less';

const emptyImg = new Image();
emptyImg.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath /%3E%3C/svg%3E";

export default class DragModal extends React.Component<DragModalProps, any> {
  dragBoxRef = React.createRef<HTMLDivElement>();
  lastMouseX = null;
  lastMouseY = null;
  currX = null;
  currY = null;
  chatWindowRect = null;
  dragLimitX = null;
  dragLimitY = null;
  shouldPositionRefresh = false;

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  componentDidUpdate() {
    const currPos = this.props.currPos || [0, 0];
    const { clientWidth } = window.document.body;
    const { clientHeight } = window.document.body;

    this.chatWindowRect = this.dragBoxRef?.current.getBoundingClientRect();
    this.currX = currPos && currPos[0];
    this.currY = currPos && currPos[1];

    if (this.dragBoxRef) {
      this.dragBoxRef.current.style.transform = `translate(${this.currX}px, ${this.currY}px)`;
    }

    this.dragLimitX = clientWidth - this.chatWindowRect.width;
    this.dragLimitY = clientHeight - 40;
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleDragStart = e => {
    e.dataTransfer.setDragImage(emptyImg, 0, 0);
    const { clientX, clientY } = e;
    this.lastMouseX = clientX;
    this.lastMouseY = clientY;
    window.document.body.addEventListener('dragover', this.handleDragOver);
  };

  handleDragEnd = () => {
    window.document.body.removeEventListener('dragover', this.handleDragOver);
  };

  handleDragOver = e => {
    let x = e.clientX - this.lastMouseX + this.currX;
    let y = e.clientY - this.lastMouseY + this.currY;
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    x = Math.max(x, 0); // 弹窗不可拖出页面左边
    x = Math.min(x, this.dragLimitX); // 弹窗不可拖出页面右边
    y = Math.max(y, 48); // 弹窗不可拖出页面上边
    y = Math.min(y, this.dragLimitY); // 弹窗拖动到页面下边时，保留弹窗顶栏不拖出页面
    this.currX = x;
    this.currY = y;

    if (!this.shouldPositionRefresh) {
      this.shouldPositionRefresh = true;
      this.refreshPosition();
    }
  };

  refreshPosition() {
    if (this.shouldPositionRefresh) {
      requestAnimationFrame(() => {
        if (this.dragBoxRef && this.dragBoxRef.current) {
          this.dragBoxRef.current.style.transform = `translate(${this.currX}px, ${this.currY}px)`;
        }
        this.refreshPosition();
      });
    }
  }

  handleResize = () => {
    this.dragLimitX = window.document.body.clientWidth - this.chatWindowRect.width;
    this.dragLimitY = window.document.body.clientHeight - this.chatWindowRect.height;
  };

  render() {
    const { children, title, wrapStyles, titleStyles, visible, onCancel } = this.props;

    return (
      <div ref={this.dragBoxRef} className={`dragModal ${visible ? 'opened' : ''}`} style={wrapStyles}>
        <div draggable className="topBar" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
          <div className="title" style={titleStyles}>
            <span>{title || '标题'}</span>
            <div className="closeBtn" onClick={onCancel}>
              <CloseOutlined />
            </div>
          </div>
        </div>

        {React.Children.map(children, child => child && React.cloneElement(child as any))}
      </div>
    );
  }
}
