/* eslint-disable no-param-reassign */
interface classFunction {
  (element: HTMLElement, className: string): boolean | void;
}
interface classesFunction {
  (element: HTMLElement, classNames: string[]): boolean | void;
}
interface RemoveClass {
  (element: HTMLElement, classNames: string | string[]): boolean | void;
}
type AddClass = RemoveClass;

const hasClass: classFunction = (element: HTMLElement, className: string): boolean => {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
  return !!reg.test(element.className);
};

const delStr = (originStr: string, str: string): string => {
  // 获取 class 内容, 并在首尾各加一个空格. ex) 'abc    bcd' -> ' abc    bcd '
  let elclass = ` ${originStr} `;
  // 将多余的空字符替换成一个空格. ex) ' abc    bcd ' -> ' abc bcd '
  elclass = elclass.replace(/(\s+)/gi, ' ');
  // 在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
  const removed = elclass.replace(` ${str} `, ' ');
  // 去掉首尾空格. ex) 'bcd ' -> 'bcd'
  return removed.replace(/(^\s+)|(\s+$)/g, '');
};

const removeClasses: classesFunction = (element: HTMLElement, classNames: string[]): void => {
  let removed = element.className;
  classNames.forEach(classname => {
    removed = delStr(removed, classname);
  });
  element.className = removed;
};

const addClasses: classesFunction = (element: HTMLElement, classNames: string[]): void => {
  const elementClassName = element.className;
  const newClass = (elementClassName && elementClassName.length && element.className.split(' ')) || [];
  classNames.forEach(classname => {
    if (newClass.indexOf(classname) < 0) {
      newClass.push(classname);
    }
  });
  element.className = newClass.join(' ');
};

const removeClass: RemoveClass = (element, classNames) => {
  if (!element) {
    return;
  }
  if (!Array.isArray(classNames)) {
    classNames = [classNames];
  }
  removeClasses(element, classNames);
};

const addClass: AddClass = (element, classNames) => {
  if (!element) {
    return;
  }
  if (!Array.isArray(classNames)) {
    classNames = [classNames];
  }
  addClasses(element, classNames);
};
export { hasClass, removeClass, addClass };
