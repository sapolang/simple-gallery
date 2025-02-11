import { ImageData } from "@/app/types";
import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<number | null>(null); // 用于防抖的定时器

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    const sentinel = document.getElementById("sentinel");
    if (sentinel) observer.current.observe(sentinel);

    return () => observer.current?.disconnect();
  }, [loading]);

  async function fetchMoreData() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/images?page=${page}`);
      const newImages = await res.json();
      setImages((prev) => [...prev, ...newImages]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to fetch more data:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleObserver(entities: IntersectionObserverEntry[]) {
    const target = entities[0];
    if (target.isIntersecting) {
      // 防抖逻辑：清除之前的定时器，重新设置一个新的定时器
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        fetchMoreData();
      }, 300); // 设置防抖延迟为 300ms
    }
  }
  return { images, loading };
}