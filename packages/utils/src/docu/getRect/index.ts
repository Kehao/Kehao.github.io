interface GetRect {
  (element: HTMLElement): Record<string, number>;
}
const getRect: GetRect = element => {
  const rect = element.getBoundingClientRect();
  const top = document.documentElement.clientTop;
  const left = document.documentElement.clientLeft;
  return {
    top: rect.top - top,
    bottom: rect.bottom - top,
    left: rect.left - left,
    right: rect.right - left,
    w: rect.right - left - (rect.left - left),
    h: rect.bottom - top - (rect.top - top)
  };
};

export { getRect };
