import { useEffect, useRef } from 'react';

export function useIntersectionObserver(
  callback: () => void,
  options = { threshold: 0.1 }
) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
    //依存配列にこれらを指定することで、Reactのページ遷移や再レンダリングでcallbackのインスタンスが変わっても、最新の関数が適用されるようにする
  }, [callback, options]);

  return observerRef;
}
