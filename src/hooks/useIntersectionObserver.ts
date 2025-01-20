import { useEffect, useRef } from 'react';

//監視対象の要素が画面内に入ったら、callback関数を実行するフック
export function useIntersectionObserver(
  callback: () => void,
  options = { threshold: 0.1 }
) {
  //ref={observerRef}で監視対象の要素を指定するとその要素を監視する
  const observerRef = useRef<HTMLDivElement>(null);

  //IntersectionObseverのコールバック関数には"監視対象の要素の状態"のリストentriesが渡される。これを分割代入している。
  //[entry]には複数の監視結果が入る可能性があるため、リストとして受け取る
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);
    //監視対象の要素が確実に存在することを確かめて、その要素を監視する
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    //useEffectはコンポーネントが再描画されるたびに実行されるので、
    //IntersectionObserverのインスタンスをクリーンアップする必要がある
    return () => observer.disconnect();

    //依存配列にこれらを指定することで、Reactのページ遷移や再レンダリングでcallbackのインスタンスが変わっても、
    //最新の関数が適用されるようにする
  }, [callback, options]);

  return observerRef;
}
