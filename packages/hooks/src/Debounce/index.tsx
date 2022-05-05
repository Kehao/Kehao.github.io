/* eslint-disable */
import { useCallback, useRef, useEffect } from 'react';

interface refProps {
  current: {
    fn: Function;
    timer: any;
  };
}

function useDebounce(fn: Function, delay: number, immediate = true) {
  const { current }: refProps = useRef({ fn, timer: null });
  useEffect(
    function() {
      current.fn = fn;
    },
    [current.fn, fn]
  );

  return useCallback(
    function f(this: any, ...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      if (immediate) {
        const callNow = !current.timer;
        if (callNow) current.fn.call(this, ...args);
        current.timer = setTimeout(() => {
          current.timer = null;
        }, delay);
      } else {
        current.timer = setTimeout(() => {
          current.fn.call(this, ...args);
        }, delay);
      }
    },
    [current.fn, current.timer, delay, immediate]
  );
}

export default useDebounce;
